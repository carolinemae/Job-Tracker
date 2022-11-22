const mongoose = require('mongoose');
// require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://cxroline:30tYwtL8CwWuee9H@job-tracker.7z3skni.mongodb.net/eichler?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
