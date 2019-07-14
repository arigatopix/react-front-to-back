const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    // เป็น foreign key ระหว่าง User กับ Contact .. ใช้ user.id
    type: mongoose.Schema.Types.ObjectId, // มาจาก User ใน mongoose
    ref: 'users'
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('contact', ContactSchema);
