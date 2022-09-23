import mongoose from 'mongoose';
require('dotenv').config();

const DB_USER = process.env.USER_DB;
const DB_PASS = process.env.PASS_DB;

async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://cluster0.lgw5swi.mongodb.net/?retryWrites=true&w=majority',
      {
        user: DB_USER,
        pass: DB_PASS,
      },
    );

    console.log('db connected!');
  } catch (e) {
    console.log('fail to connect' + e);
  }
}

export default connect;
