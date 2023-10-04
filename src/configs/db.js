const mongoose = require('mongoose')
const { MONGODBURL } = require('../helpers/env')

mongoose.connect(MONGODBURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('db connected')
}).catch((err) => {
  console.log('db disconnect')  
  console.log(err)
})


module.exports = mongoose