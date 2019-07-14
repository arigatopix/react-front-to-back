const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private : เฉพาะ user ที่ login จะดู contact ได้ .. เพิ่ม auth จาก middleware เข้าไป
router.get('/', auth, async (req, res) => {
  try {
    // fetch contact จาก database แล้วเรียงอันใหม่สุดอยู่ข้างบน
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });

    // send data
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth : ใช้ endpoint เดียวกันแต่คนละ Method
// @desc    Auth user and get Token
// @access  Private .. ต้องใช้ auth จาก middleware และ express validator ใช้ array
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id // ใช้ user foreign key จาก middleware
      });

      const contact = await newContact.save();

      // อย่าลืมส่งให้ client ด้วย ไม่งั้นรอไปเหอะ
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

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
