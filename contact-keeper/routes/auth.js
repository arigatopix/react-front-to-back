const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// * Login (GET)
// @route   GET api/auth
// @desc    Get log in user ต้องเอา token มาเช็คด้วย จาก middleware
// @access  Private คือเฉพาะ user ที่มีในระบบ
router.get('/', auth, async (req, res) => {
  // ทุก request จะเช็ค token header (user ที่ login แล้วจะมี มันมาจาก middleware)
  try {
    // หา user id จาก request user object (มาจาก middleware)
    // select('-password') คือ "ไม่ให้" return password
    const user = await User.findById(req.user.id).select('-password');

    // แสดงผล
    // * ลองกด post ให้สร้าง token อันใหม่ แต่ get ใช้ token อันเดิม ปรากฎว่าใช้ได้
    // * แต่ถ้า token ผิดไปตัวนึง จะใช้ไม่ได้
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth : ใช้ endpoint เดียวกันแต่คนละ Method
// @desc    Auth user and get Token
// @access  Private
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required.').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // ถ้าไม่มี user ในระบบ
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // มี user แล้วเอา password มาเช็ค
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // password ถูกต้อง ส่ง token กลับไป client
      const payload = {
        // บางส่วนของ jwt ใช้ user.id ในการสร้าง token
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err; // ถ้ามี error
          res.json({ token }); // ถ้าผ่าน return token ให้กับ client
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
