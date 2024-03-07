const {Web3} = require('web3')
const contractABI = require("../../build/contracts/Voting.json")
const {CONTRACTADDRESS, WEB3URL, SENDERADDRESS} = require('../helpers/env')
const web3 = new Web3(WEB3URL)
const contractAddress = "0xbA509dC188BFc68c2758bA14d4c9e1370aa05945"
const senderAddress = SENDERADDRESS;
const contract = new web3.eth.Contract(contractABI.abi, contractAddress)
module.exports = {
  createCandidate: async (_voteId, _voteName, _candidateId, _candidateName) => {
    try {
      const encodedData = await contract.methods.initVoting(_voteId, _voteName, _candidateId, _candidateName).encodeABI()
      const estimatedGas = await contract.methods.initVoting(_voteId, _voteName, _candidateId, _candidateName).estimateGas({ from: senderAddress, data: encodedData })
      const transaction = await contract.methods.initVoting(_voteId, _voteName, _candidateId, _candidateName).send({
        from: senderAddress,
        data: encodedData,
        gas: estimatedGas
      })
      const logs = await contract.getPastEvents('VotingResult', { fromBlock: transaction.blockNumber, toBlock: transaction.blockNumber })
      const result = logs[0].returnValues.success;
      return result
    } catch (error) {
      console.error('Error:', error);
    }
  },
  getVoting: async (_voteId) => {
    try {
      const result = await contract.methods.getVoting(_voteId).call()
      return result
    } catch (error) {
      console.error('Error:', error);
    }
  },
  voteCandidate: async (_userId, _candidateId) => {
    try {
      const encodeData = await contract.methods.voteCandidate(_userId, _candidateId).encodeABI()
      const estimatedGas = await contract.methods.voteCandidate(_userId, _candidateId).estimateGas({from: senderAddress, data: encodeData})
      const transaction = await contract.methods.voteCandidate(_userId, _candidateId).send({
        from: senderAddress,
        data: encodeData,
        gas: estimatedGas
      })
      const logs = await contract.getPastEvents('VotingResult', {fromBlock: transaction.blockNumber, toBlock: transaction.blockNumber})
      const result = logs[0].returnValues.success
      return result
    } catch (error) {
      console.error('Error:', error);
    }
  }
}