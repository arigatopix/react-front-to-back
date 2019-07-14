const express = require('express');
const router = express.Router();

// * Register (POST)
// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
  // จะได้ // /api/users
  res.send('Register a user');
});

module.exports = router;
