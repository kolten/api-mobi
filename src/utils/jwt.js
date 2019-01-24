const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Token verification
module.exports.verifyToken = async (token) => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET)
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

module.exports.parseHeader = (req, next) => {
  if (!req.headers['authorization']) return next(Error('permission denied'));
  let token = req.headers['authorization']
  return token = token.split(" ")[1]
}

module.exports.verifyUser = (req, res, next) => {
  const token = this.parseHeader(req, next);

  this.verifyToken(token)
  .then((result) => {
    const { id } = result.user;
    const user = User.byId(id);
    // checking if valid membership, else deny 
    user.then((_user) => _user.get('member') ?
      next()
      :
      next(res.status(403).json({error: "Membership expired. Contact us at uta.mobi@gmail.com for help!"}) ))
  })
  .catch((err) => {
    next(res.status(403).json({error: err.message}))
  })
}

module.exports.getProfile = (req, res, next) => {
  const token = this.parseHeader(req, next);

  this.verifyToken(token)
  .then((result) => {
    const { id } = result.user;
    const user = User.byId(id);
    user.then((_user) => {
      next(res.json({
        "first_name": _user.get('first_name'),
        "last_name": _user.get('last_name'),
        "email": _user.get('email'),
        "is_member": _user.get('member'),
        "is_admin": _user.get('is_admin'),
      }))
    })
  })
  .catch((err) => {
    next(res.status(403).json({error: err.message}))
  })
}

module.exports.verifyAdminTokenMiddleware = (req, res, next) => {
  const token = this.parseHeader(req);

  this.verifyToken(token)
  .then((result) => {
    const { id } = result.user;
    const checkAdmin = this.isAdmin(id);
    checkAdmin.then((admin) => {
      if(admin){
        next()
      }else {
        throw Error("Invalid permissions");
      }
    })
  }).catch((err) => {
    next(res.status(403).json({error: err.message}))
  });
}


