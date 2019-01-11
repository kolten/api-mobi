
const Joi = require('joi');
const router = require('express').Router();
const hat = require('hat');
const {omit} = require('lodash');

const mailgun = require('../services/mailgun');

const User = require('../models/User')
const Reset = require('../models/Resets');
const Invoice = require('../models/Invoices');

const registerSchema = require('../schemas/register_schema');
const loginSchema = require('../schemas/login_request_schema');

module.exports.register = async (data) => {

  const user = omit(data, ["amount", "paid"])

  try {
    // First find if the current user exists
    const _u = await User.byEmail(data.email)
    // if return null, create the new user
    if(!_u) {
      const _user = await new User({
        ...user,
        password: hat(),
        member: data.paid
      }).save();
  
      await new Invoice({
        user_id: _user.id,
        paid: data.paid,
        amount: data.amount
      }).save();
  
      _reset = await new Reset({
        token: hat(),
        user_id: _user.id
      }).save();

      const message = {
        from: 'uta.mobi@gmail.com',
        to: _user.get('email'),
        subject: `Password reset for ${_user.get('email')}`,
        // TODO: Set up sending HTML page
        text: `Visit members.utamobi.com/reset?token=${_reset.get('token')} to reset password. This message will expire in 30 minutes!`
      }

      mailgun.messages().send(message, function (err, body) {
        if(err) {
          throw new Error(err)
        }
      })
    }
  }
  catch (e) {
    throw e
  }
}

module.exports.login = async (data) => {
  try {
    const _u = await User.byEmail(data.email)

    if(!_u) throw Error("Account does not exsist!")

    // Check if user has reset password from register
    if(_u.get('verified_email')){
      // Check incoming password versus hash w/ bcrypt

      // return JWT token
    }

  } 
  catch (err) {
    throw err
  }
}


router.post('/register', (req, res, next) => {
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
        //return res.status(400).json({err})
        next(res.json({error: err}))
      })
    }
  })
})

router.post('/login', (req, res, next) => {
  const { body } = req;

  Joi.validate(body, loginSchema, (err, data) => {
    if(err) {
      return res.status(400).send({
        error: err.details[0].message
      })
    }
    else {
      const login = this.login(data)

      login.then((result) => {
        return res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
    }
  })
})

module.exports = router;