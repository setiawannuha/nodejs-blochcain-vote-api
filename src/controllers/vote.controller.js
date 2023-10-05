const Candidate = require('../models/candidates.model')
const {createCandidate, getVoting, voteCandidate} = require("../services/voting.service")
module.exports = {
  get: async(req, res) => {
    try {
      const voteid = req.params.voteid
      const votings = await getVoting(parseInt(voteid))
      const result = votings.map(item => ({
        voteId: item.voteId.toString(),
        candidateId: item.candidateId.toString(),
        candidateName: item.candidateName,
        voteTotal: item.voteTotal.toString(),
      }));
      return res.status(200).json({data: result})
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  },
  create: async(req, res) => {
    try {
      const voteid = req.params.voteid
      const {candidates, voteName} = req.body
      const candidatesData = []
      for (let i = 0; i < candidates.length; i++) {
        const candidate = await Candidate.findOne({candidateId: candidates[i]})
        if(!candidate){
          return res.status(404).json({ message: `candidate id ${candidates[i]} not found` });
        }
        candidatesData.push(candidate)
      }
      for (let i = 0; i < candidatesData.length; i++) {
        const status = await createCandidate(
          voteid, 
          voteName, 
          candidatesData[i].candidateId, 
          candidatesData[i].candidateName);
        if(!status){
          return res.status(500).json({message: "init voting failed"})
        }
      }
      return res.status(200).json({message: "init voting success"})
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  },
  vote: async(req, res) => {
    try {
      const user = req.userData;
      const userId = user.userId
      const {candidateId} = req.body
      const candidate = await Candidate.findOne({candidateId})
      if(!candidate){
        return res.status(404).json({ message: 'candidate not found' });
      }
      const result = await voteCandidate(parseInt(userId),parseInt(candidateId))
      if(result){
        return res.status(200).json({ message: 'vote success' })
      }
      return res.status(200).json({ message: 'vote failed, you already voted' })
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  },
}