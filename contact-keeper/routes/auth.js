const express = require('express');
const router = express.Router();

// * Login (GET)
// @route   GET api/auth
// @desc    Get log in user
// @access  Private คือเฉพาะ user ที่มีในระบบ
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route   POST api/auth : ใช้ endpoint เดียวกันแต่คนละ Method
// @desc    Auth user and get Token
// @access  Private
router.post('/', (req, res) => {
  res.send('Log in user');
});

module.exports = router;
