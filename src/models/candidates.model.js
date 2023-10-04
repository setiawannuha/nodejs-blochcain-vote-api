const mongoose = require('../configs/db')
const { Schema } = require('mongoose')

const candidateSchema = new Schema({
  candidateId: {
    type: Number,
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true,
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

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate