const router = require('express').Router();

const {
  auth,
  internal
} = require('./modules')

router.get('/', (req, res) => {
  res.sendStatus(200);
});


router.use('/auth', auth);
router.use('/admin', internal)

module.exports = router;