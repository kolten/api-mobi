require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const hat = require('hat');

chai.use(chaiHttp);

const server = require('../src');
const knex = require('../db/knex');

const adminUser = {
  id: 1,
  first_name: "Kolten",
  last_name: "Sturgill",
  email: "koltensturgill@gmail.com",
  student_id: "1001089599",
  shirt_size: "M",
  paid: true,
  amount: 1500,
}

const user = {
  first_name: "Some",
  last_name: "User",
  email: "someuser@gmail.com",
  student_id: "1001111119",
  shirt_size: "S",
  paid: true,
  amount: 1500,
}

const token = jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  user: { id: 1 }
}, process.env.JWT_SECRET);

const fake_reset = hat();

// Defining our test suite
describe('Routes: auth', () => {  
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  })

  afterEach(() => {
    return knex.migrate.rollback();
  })

  describe('POST /register', () => {
    test('Should create a user', async () => {
      const res = await chai
      .request(server)
      .post(`/v1/auth/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...user
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      })
    })
  })

  describe('POST /auth/reset', () => {
    test('Should fail to update users password with bogus token', async () => {
      const res = await chai
      .request(server)
      .post(`/v1/auth/reset`)
      // TODO: send token, user inputted password
      .send({
        token: fake_reset,
        password: 'my_new_password'
      })
      expect(res.status).toEqual(400);
    })
  })

  describe('POST /login', () => {
    test('Check login with out resetting password', async () => {
      const res = await chai
      .request(server)
      .post(`/v1/auth/login`)
      .send({
        email: user.email,
        password: 'xyz123'
      })
      .then((response) => {
        expect(response.status).toEqual(401);
      })
    })
  })
})