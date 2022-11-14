const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://cxroline:BandS!7689@job-tracker.7z3skni.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
