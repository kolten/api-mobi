const router = require('express').Router();

const {
  auth,
  admin
} = require('./modules')

router.get('/', (req, res) => {
  res.sendStatus(200);
});


router.use('/auth', auth);
router.use('/admin', admin)

module.exports = router;