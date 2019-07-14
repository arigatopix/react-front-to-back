const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private : เฉพาะ user ที่ login จะดู contact ได้
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// @route   POST api/auth : ใช้ endpoint เดียวกันแต่คนละ Method
// @desc    Auth user and get Token
// @access  Private
router.post('/', (req, res) => {
  res.send('Add contact');
});

// @route   PUT api/auth/:id ** PUT PATCH DELETE ต้องระบุ User
// @desc    Auth user and get Token
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route   DELETE api/auth/:id ** PUT PATCH DELETE ต้องระบุ User
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
