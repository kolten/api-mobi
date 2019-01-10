
const Joi = require('joi');
const registerSchema = require('../schemas/register_schema');
const router = require('express').Router();
const hat = require('hat');
const {omit} = require('lodash');
const User = require('../models/User')
const Reset = require('../models/Resets');
const Invoice = require('../models/Invoices');

module.exports.register = async (data) => {

  const user = omit(data, ["amount", "paid"])

  try {
    const _u = await User.byEmail(data.email)
    if(!_u) {
      const u = await new User({
        ...user,
        password: hat(),
        member: data.paid
      }).save();
  
      const _invoice = await new Invoice({
        user_id: u.id,
        paid: data.paid,
        amount: data.amount
      }).save();
  
      const _reset = await new Reset({
        token: hat(),
        user_id: u.id
      }).save();

      return { u, _invoice, _reset }
    } 
    else {
      throw new Error("User exists")
    }
  }
  catch (e) {
    throw new Error({error: e})
  }
}

module.exports.login = async (data) => {

}

router.post('/register', (req, res) => {
  const { body } = req;
  Joi.validate(body, registerSchema, (err, data) => {
    if (err) {
      return res.status(400).send({
        error: err.details[0].message
      })
    }
    else {
      const reg = this.register(data)

      reg.then((result) => {
        return res.status(200).send(result)
      })
      .catch((err) => {
        return res.status(400).json({err})
      })
    }
  })
})

router.post('/login', (req, res) => {
  
})

module.exports = router;