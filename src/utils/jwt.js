const jwt = require('jsonwebtoken');

// JWT Token verification
module.exports.verifyToken = async (token) => {
  try {
    return await jwt.verify(token, 'secret')
  } catch (error) {
    throw error
  }
}

module.exports.verifyTokenMiddleware = async (req, res, next) => {
  
}



