const mongoose = require('../configs/db')
const { Schema } = require('mongoose')

const userSchema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: '1'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User