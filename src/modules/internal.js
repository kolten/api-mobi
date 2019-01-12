const router = require('express').Router();

const User = require('../models/User');

const { verifyAdminTokenMiddleware } = require('../utils/jwt');

router.use(verifyAdminTokenMiddleware);

router.get('/users', (req, res, next) => {
  res.status(404).json({error: "Not implemented yet"});
})

module.exports = router;