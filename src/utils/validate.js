const Joi = require('joi');

validate = async (body, schema) => {
  try {
    return await Joi.validate(body, schema, (err, data) => {
      if(err){
        //return {error: err.details[0].message}
        throw Error(err.details[0].message)
      }
      else {
        return data
      }
    })
  }
  catch(e){
    throw e
  }
}

module.exports = validate