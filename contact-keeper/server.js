const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

const app = express();

// Connect Database
connectDB();

// Init Middleware
// เพราะเวลาสื่อสารระหว่าง client กับ server (TCP/IP) จะส่งข้อมูลเป็นก้อนๆ จึงต้องมี parserBody เป็นตัวรวม
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder ให้ไปมองใน folder build หลัง npm run build
  app.use(express.static('client/build'));

  // ให้มอง route ทุกอัน โดยโหลด homepage จาก index.html
  app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')))
}

// ระบุ PORT ระหว่าง dev กับ prod
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
