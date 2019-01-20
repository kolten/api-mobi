const router = require('express').Router();
const {
  getAllUsers,
  createArticle
} = require('./controllers.js');

const { verifyAdminTokenMiddleware } = require('../../utils/jwt');

const validate = require('../../utils/validate');

const {articleSchema} = require('../../schemas');

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
  // res.status(404).json({error: "Not implemented yet"});
  const { body } = req;
  const valid = validate(body, articleSchema)
  valid.then((data) => {
    const article = createArticle(data)
    article.then((a) => {
      return res.status(201).json(a);
    })
    .catch((err) => {
      next(res.status(500).json({error: err.message}));
    })
  })
  .catch((err) => {
    next(res.status(400).json({error: err.message}))
  })
})

router.put('/article', (req, res, next) => {
  res.status(404).json({error: "Not implemented yet"});
})

router.delete('/article', (req, res, next) => {
  res.status(404).json({error: "Not implemented yet"});
})

module.exports = router;