const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URI || process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
