process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src');
const knex = require('../db/knex');

const user = {
  first_name: "Kolten",
  last_name: "Sturgill",
  email: "koltensturgill@gmail.com",
  student_id: "1001089599",
  shirt_size: "M",
  paid: true,
  amount: 1500
}

// Defining our test suite
describe('Routes: users', () => {
  
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
  })

  afterEach(() => {
    return knex.migrate.rollback();
  })

  describe('POST /register', () => {
    test('Should create a user', async () => {
      const res = await chai
      .request(server)
      .post(`/v1/auth/register`)
      .send({
        ...user
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      })
    })
  })

  describe('POST /login', () => {
    test('Check login for users', async () => {
      const res = await chai
      .request(server)
      .post(`/v1/auth/login`)
      .send({
        email: user.email,
        password: 'xyz123'
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      })
    })
  })

  describe('POST /auth/reset-password', () => {
    test('Should update reset the users password if token has not expired', async () => {
      const res = await chai
      .request(server)
      .post(`/v1/auth/reset-password`)
      // TODO: send token, user inputted password
      expect(res.status).toEqual(200);
    })
  })

})