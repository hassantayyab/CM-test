const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FormSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  query: {
    type: String,
    required: true
  },
  date_added: {
    type: Date,
    default: Date.now
  }
});

module.exports = { Form: Form = mongoose.model('form', FormSchema), FormSchema }