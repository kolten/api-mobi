require('dotenv').config();
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src');
const knex = require('../db/knex');

const BASE_URL = `${process.env.VERSION}/users`

const user = {
  first_name: "Kolten",
  last_name: "Sturgill",
  email: "koltensturgill@gmail.com",
  student_id: "1001089599"
}

// Defining our test suite
describe('Routes: users', () => {
  
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  })

  afterEach(() => {
    return knex.migrate.rollback();
  })

  describe('POST /users', () => {
    test('Should create a user', async () => {
      const res = await chai
      .request(server)
      .post(`${BASE_URL}`)
      .send({
        // We'll set a temp password, send an email with temp token
        ...user
      })

      expect(res.status).toEqual(200);
    })
  })

  describe('GET /users/:id', () => {
    test('Should create a user by id', async () => {
      const res = await chai
      .request(server)
      .get(`${BASE_URL}/1`)

      expect(res.status).toEqual(200);
    })
  })

  describe('POST /users/reset-password', () => {
    test('Should update reset the users password if token has not expired', async () => {
      const res = await chai
      .request(server)
      .post(`${BASE_URL}/reset-password`)
      // TODO: send token, user inputted password
      expect(res.status).toEqual(200);
    })
  })

})