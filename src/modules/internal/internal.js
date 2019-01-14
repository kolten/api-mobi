const router = require('express').Router();
const {
  getAllUsers
} = require('./controllers.js');

const { verifyAdminTokenMiddleware } = require('../../utils/jwt');

router.use(verifyAdminTokenMiddleware);

router.get('/users', (req, res, next) => {
  const limit = parseInt(req.query.limit || 50, 10);
  const offset = parseInt(req.query.offset || 0, 0);
  const users = getAllUsers(parseInt(limit), parseInt(offset));
  
  users.then((result) => {
    res.status(200).json({
      users: result,
      meta: result.pagination
    })
  }).catch((err) => {
    next(res.status(500).json(err))
  });
})

router.post('/article', (req, res, next) => {
  res.status(404).json({error: "Not implemented yet"});
})

router.put('/article', (req, res, next) => {
  res.status(404).json({error: "Not implemented yet"});
})

router.delete('/article', (req, res, next) => {
  res.status(404).json({error: "Not implemented yet"});
})

module.exports = router;