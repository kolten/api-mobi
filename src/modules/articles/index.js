const router = require('express').Router();
const { verifyUser } = require('../../utils/jwt');


router.get('/', verifyUser, (req, res, next) => {
  return res.sendStatus(200);
})

module.exports = router;