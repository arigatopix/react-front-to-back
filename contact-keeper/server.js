const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// เพราะเวลาสื่อสารระหว่าง client กับ server (TCP/IP) จะส่งข้อมูลเป็นก้อนๆ จึงต้องมี parserBody เป็นตัวรวม
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Contact Kepper API' })
);

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

// ระบุ PORT ระหว่าง dev กับ prod
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
