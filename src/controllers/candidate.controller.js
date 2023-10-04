const Candidate = require('../models/candidates.model')
const {destroyFile} = require("../middlewares/multer")

module.exports = {
  all: async(req, res) => {
    try {
      const search = req.query.search ? req.query.search : ""
      const data = await Candidate.find({
        candidateName: { $regex: new RegExp(search, 'i') }, // 'i' flag for case-insensitive search
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
      const {candidateId, candidateName} = req.body
      const picture = req.file.path
      const candidate = await Candidate.findOne({candidateId, candidateName})
      if(candidate){
        await destroyFile(picture)
        return res.status(404).json({ message: 'Candidate ID or Candidate Name Already exists' });
      }
      const newData = new Candidate({
        candidateId,
        candidateName,
        picture
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
      const {candidateName} = req.body
      const picture = req.file.path
      const candidate = await Candidate.findById(id)
      if(!candidate){
        return res.status(404).json({ message: 'data not found' });
      }
      const result = await Candidate.findByIdAndUpdate(id, {
        candidateName,
        picture
      })
      if (!result) {
        return res.status(404).json({ message: 'data not found' });
      }
      await destroyFile(candidate.picture)
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
      const result = await Candidate.findByIdAndDelete(id)
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