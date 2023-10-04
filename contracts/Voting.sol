pragma solidity ^0.8.19;
contract Voting {
  uint public voteIdActive;
  struct VotingItem {
    uint voteId;
    uint candidateId;
    string candidateName;
    int voteTotal;
  }
  VotingItem[] public votings;
  struct VoterItem {
    uint voteId;
    uint userId;
    uint candidateId;
  }
  VoterItem[] public voters;

  event VotingResult(bool success);

  // init voting app (activated vote id and create candidate)
  function initVoting(uint _voteId, uint _candidateId, string memory _candidateName) public {
    bool isError = false;
    bool candidateIdExixts = false;
    voteIdActive = _voteId;
    for (uint256 i = 0; i < votings.length; i++) {
      if(voteIdActive == votings[i].voteId && _candidateId == votings[i].candidateId){
        candidateIdExixts = true;
        isError = true;
        break;
      }
    }
    if(candidateIdExixts == false){
      VotingItem memory newVotingCandidate = VotingItem(voteIdActive, _candidateId, _candidateName, 0);
      votings.push(newVotingCandidate);
    }
    emit VotingResult(!isError);
  }

  function voteCandidate(uint _userId, uint _candidateId) public {
    bool isError = false;
    bool voterExists = false;
    bool candidateIdExixts = false;

    // checking candidate id
    for (uint256 i = 0; i < votings.length; i++) {
      if(voteIdActive == votings[i].voteId && _candidateId == votings[i].candidateId){
        candidateIdExixts = true;
        break;
      }
    }
    if(candidateIdExixts == false){
      isError = true;
      emit VotingResult(!isError);
      return;
    }

    // checking is user already voted
    for (uint256 i = 0; i < voters.length; i++) {
      if(voteIdActive == voters[i].voteId && voters[i].userId == _userId){
        voterExists = true;
        isError = true;
        break;
      }
    }
    if(voterExists){
      emit VotingResult(!isError);
      return;
    }
    VoterItem memory newVoter = VoterItem(voteIdActive, _userId, _candidateId);
    voters.push(newVoter);

    // voting processing
    for (uint256 i = 0; i < votings.length; i++) {
      if(voteIdActive == votings[i].voteId && votings[i].candidateId == _candidateId){
        votings[i].voteTotal ++;
        break;
      }
    }
    emit VotingResult(!isError);
  }

  
  function getVoting(uint _voteId) public view returns (VotingItem[] memory) {
    VotingItem[] memory filteredVotings = new VotingItem[](votings.length);
    uint256 filteredVotingsCount = 0;
    // filtering vote data
    for (uint256 i = 0; i < votings.length; i++) {
        if (votings[i].voteId == _voteId) {
            filteredVotings[filteredVotingsCount] = votings[i];
            filteredVotingsCount ++;
        }
    }
    // create new array for result
    VotingItem[] memory result = new VotingItem[](filteredVotingsCount);
    for (uint256 j = 0; j < filteredVotingsCount; j++) {
        result[j] = filteredVotings[j];
    }
    return result;
  }
}