import { createContext } from 'react';

const githubContext = createContext();
// รับข้อมูลผ่าน Provider ต้องครอบทุก Component
// Context Object ท่อส่งข้อมูล
// ส่งข้อมูลผ่าน this.contaxt หรือ Consumer

export default githubContext;

// ทำหน้าที่เป็นท่อ ส่ง Context ไปหา Nested component
