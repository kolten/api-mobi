const router = require('express').Router();

const {
  auth,
  admin,
  articles
} = require('./modules')

router.get('/', (req, res) => {
  res.sendStatus(200);
});


router.use('/auth', auth);
router.use('/admin', admin);
router.use('/articles', articles);

module.exports = router;