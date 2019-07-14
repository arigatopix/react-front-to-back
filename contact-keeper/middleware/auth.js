const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header ช่วย protect route เวลา user กำลัง logged in
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // ถ้าเป็น token ก็ใส่ไว้ใน object decoded
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // middleware ส่ง user object พร้อมกับ token เอาไปใช้เช็คว่า user logged in หรือเปล่า
    req.user = decoded.user;
    next();
  } catch (err) {
    // กรณี token ผิด
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
