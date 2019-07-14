const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// lib ช่วยเช็ค field ที่ input เข้ามา
// https://express-validator.github.io/docs/

// import Schema
const User = require('../models/User');

// * Register (POST)
// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Plese add name')
      .not()
      .isEmpty(),
    check('email', 'Plese include a valid email').isEmail(),
    check(
      'password',
      'Plese enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // find error จาก validate ที่มาจาก request โดย function นี้ทำให้เป็น object
    // * ผิดคำว่า errors ตัวเดียว หาไม่เจอ WTF!!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // มี errors .. return status and array
      return res.status(400).json({ errors: errors.array() });
    }

    // Create User function
    const { name, email, password } = req.body;

    try {
      // เช็คว่ามี user (email) ใช้ไปแล้วรึยัง
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists.' });
      }

      // create new user
      user = new User({
        name,
        email,
        password
      });

      // encrypt password with bcrypt
      const salt = await bcrypt.genSalt(10);

      // เอา password plain text มาแปลงเป็น hash
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('User saved');
    } catch (error) {
      // จะ error เมื่อ Server มีปัญหา

      // ส่ง log ให้ develop ไม่ต้องแสดงหน้า api
      console.error(error.message);

      // ส่งไปให้ client
      res.status(500).send('Server Error.');
    }
  }
);

module.exports = router;
