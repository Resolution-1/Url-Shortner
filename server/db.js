const mongoose = require('mongoose');
const db =
  process.env.MONGODB_URI ||
  'mongodb+srv://aayush:aayush123@cluster0.myfvg.mongodb.net/urlshortner?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('mongoose connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
