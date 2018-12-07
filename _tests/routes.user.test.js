require('dotenv').config();
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src');
const knex = require('../db/knex');

describe('Routes: users', () => {
  
  beforeEach(() => {
    return knex.migrate.rollback()
          .then(() => knex.migrate.latest())
          .then(() => knex.seed.run());
  })

  afterEach(() => {
    return knex.migrate.rollback();
  })


  describe('GET /users', () => {
    test('Should return an array of users', async () => {
      const res = await chai.request(server).get(`/${process.env.VERSION}/users`)
      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
    })
  })
})