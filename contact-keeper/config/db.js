const mongoose = require('mongoose');
const config = require('config');
// ใช้เรียก default.json
const db = config.get('mongoURI');

const connectDB = async () => {
  // ได้ Promises object
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    // ถ้า connect ได้
    console.log('MongoDB Connected...');
  } catch (error) {
    // เกิด error
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
