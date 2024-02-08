const mongoose = require('mongoose');

// const URI = "mongodb://127.0.0.1:27017/mern_admin";

const URI = process.env.MONGODB_URI;

// console.log(URI);


const connectDB = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
    console.log("DB connection failed");
    process.exit(0);
  }
}

module.exports = connectDB;