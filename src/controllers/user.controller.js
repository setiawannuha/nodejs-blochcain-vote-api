const User = require('../models/users.model')
const argon2 = require('argon2')

module.exports = {
  all: async(req, res) => {
    try {
      const search = req.query.search ? req.query.search : ""
      const data = await User.find({
        fullname: { $regex: new RegExp(search, 'i') }, // 'i' flag for case-insensitive search
      })
      return res.status(200).json({data})
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  },
  insert: async(req, res) => {
    try {
      const {fullname, role, username, password, userId} = req.body
      const user = await User.findOne({
        $or: [
          { username },
          { userId }
        ]
      })
      if(user){
        return res.status(404).json({ message: 'User ID or Username Already exists' });
      }
      const hash = await argon2.hash(password)
      const newData = new User({
        fullname,
        role,
        username,
        password: hash,
        userId
      })
      const result = await newData.save();
      return res.status(200).json({data: result})
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  },
  update: async(req, res) => {
    try {
      const id = req.params.id
      const {fullname, role, username} = req.body
      const result = await User.findByIdAndUpdate(id, {
        fullname, role, username
      })
      if (!result) {
        return res.status(404).json({ message: 'data not found' });
      }
      return res.status(200).json({data: result._id})
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  },
  destroy: async(req, res) => {
    try {
      const id = req.params.id
      const result = await User.findByIdAndDelete(id)
      if (!result) {
        return res.status(404).json({ message: 'data not found' });
      }
      return res.status(200).json({data: result._id})
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  }
}