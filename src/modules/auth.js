
const Joi = require('joi');
const router = require('express').Router();
const hat = require('hat');
const {omit} = require('lodash'); 
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sendResetEmail } = require('../services/mailgun');

const User = require('../models/User')
const Resets = require('../models/Resets');
const Invoices = require('../models/Invoices');

const { loginSchema, registerSchema, resetSchema } = require('../schemas')

// TODO: Move controller functions to another file
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
  
      await new Invoices({
        user_id: _user.id,
        paid: data.paid,
        amount: data.amount
      }).save();
  
      _reset = await new Resets({
        token: hat(),
        user_id: _user.id
      }).save();
      
      await sendResetEmail(user , _reset.get('token'))
    }
  }
  catch (e) {
    throw e.message;
  }
}

module.exports.login = async (data) => {
  try {
    const _user = await User.byEmail(data.email);

    if(!_user) throw Error("Account does not exist!");

    // Check if user has reset password from register
    if(_user.get('email_verified')){
      // Check incoming password versus hash w/ bcrypt
      const token = await this.checkPassword(data.password, _user);

      if(token) {
        return {
          "Authorization": token,
          "first_name": _user.get('first_name'),
          "email": _user.get('email')
        }
      } 
      throw Error("Invalid email or password. Try again.");
    }
    throw Error("Check your email for a verification email!");
  }
  catch(err) {
    throw err
  }
}

module.exports.checkPassword = async (password, user) => {
  const match = await bycrypt.compare(password, user.get('password'));
  if(match) {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      user: user.get('id')
    }, 'secret')
  } 
  else {
    return null
  }
}

// TODO: Count number of Resets to detect abuse in order to preserve mailgun emails
module.exports.reset = async (data) => {
  try {
    const now = new Date();
    const _reset = await Resets.where({token: data.token}).fetchAll({withRelated: ['user']});

    const reset = await _reset.toJSON();

    // get the last reset from the query
    if(reset && reset[0]){
      const expires = new Date(reset[0].expires_at)
      // get the user
      const _user = await User.where({id: reset[0].user_id}).fetch();

      if(_user.get('email_verified')){
        throw Error("You've already verified your account! Go to https://members.utamobi.com/login to login.");
      }
      
      if(expires > now){
        // Create a hash of the password
        const hash = await bycrypt.hash(data.password, 10);

        _user.set({password: hash, email_verified: true});

        await _user.save()
        // return JWT token
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          user: _user.get('id')
        }, 'secret');

        return {
          "Authorization": token,
          "first_name": _user.get('first_name'),
          "email": _user.get('email')
        }
      } else {
        // Issue new reset
        _newReset = await new Resets({
          token: hat(),
          user_id: reset[0].user_id
        }).save();

        await sendResetEmail(reset[0].user, _newReset);
        throw Error("Token has expired. Check your email for another token.");
      }
    }
  } catch (error) {
    throw error;
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
        if(result){
          return res.status(200).json(result)
        }
        else {
          return res.status(400).send(result)
        }
      }).catch((err) => {
        console.log(err);
        next(res.status(400).json({error: err}))
      });
    }
  })
})


router.post('/reset', (req, res, next) => {
  const { body } = req;

  Joi.validate(body, resetSchema, (err, data) => {
    if (err) {
      return res.status(400).send({
        error: err.details[0].message
      })
    }
    else {
      const reset = this.reset(data)
      reset.then((result) => {
        return res.json(result)
      }).catch((err) => {
        next(res.status(400).json({error: err.message}))
      });
    }
  })
})

module.exports = router;