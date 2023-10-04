const User = require('../models/users.model')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../helpers/env")

module.exports = {
  login: async(req, res) => {
    try {
      const {username, password} = req.body
      const user = await User.findOne({
        username: username
      })
      if (!user) {
        return res.status(404).json({ message: 'Username or password wrong' });
      }
      const verifyPassword = await argon2.verify(user.password, password)
      if(verifyPassword){
        user.password = null
        const token = jwt.sign({...user}, JWT_SECRET);
        return res.status(200).json({data: {user, token: `Bearer ${token}`}})
      }
      return res.status(404).json({ message: 'Username or password wrong' });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  }
}