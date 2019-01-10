const router = require('express').Router();

const {
  auth
} = require('./modules')

router.get('/', (req, res) => {
  res.sendStatus(200);
});


router.use('/auth', auth);

module.exports = router;