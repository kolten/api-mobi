const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Token verification
module.exports.verifyToken = async (token) => {
  try {
    return await jwt.verify(token, 'secret')
  } catch (error) {
    throw error
  }
}

module.exports.isAdmin = async (id) => {
  try{
    const user = await User.where({id: id}).fetch();

    return user && user.get('is_admin');
  }
  catch(err) {
    throw Error(err)
  }
}


module.exports.verifyAdminTokenMiddleware = (req, res, next) => {
  if (!req.headers['authorization']) return next(Error('permission denied'))

  let token = req.headers['authorization']
  token = token.split(" ")[1]

  this.verifyToken(token)
  .then((result) => {
    if(result){
      const { id } = result.user;
      const checkAdmin = this.isAdmin(id);
      checkAdmin.then((admin) => {
        if(admin){
          next()
        }else {
          throw Error("Invalid permissions");
        }
      }).catch((err) => {
        next(res.status(401).json({error: err.message}))
      });
    }
  }).catch((err) => {
    next(err)
  });
}


