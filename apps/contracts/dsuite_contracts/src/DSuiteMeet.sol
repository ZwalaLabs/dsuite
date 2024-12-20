//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ParticipationNFT} from "./ParticipationNFT.sol";


error DSuiteMeet_InvalidParticipant();
error DSuiteMeet_InvalidID();

contract DSuiteMeet {
    uint256 private meetId = 0;

    struct Meeting {
        uint256 id;
        string name;
        ParticipationNFT nft;
        address owner;
        address[] participants;
    }

    mapping(uint256 => Meeting) meetIdToMeeting;
    mapping(address => uint256[]) ownerToMeetIds;

    event MeetingCreated( uint id, address owner);
    event ParticipantAdded(uint id, address participant);

    function createMeet(string memory _event) public returns (uint256) {
        meetId++;
        emit MeetingCreated(meetId, msg.sender);
        ParticipationNFT newNFT = new ParticipationNFT(msg.sender, _event, _event);
        Meeting memory newMeeting =
            Meeting({id: meetId, name: _event, nft: newNFT, owner: msg.sender, participants: new address[](0)});
        meetIdToMeeting[meetId] = newMeeting;
        ownerToMeetIds[msg.sender].push(meetId);

        return meetId;
    }

    function invite(address _participant, uint256 _meetId) public returns (uint256) {
        if (_meetId > meetId || _participant == msg.sender || (meetIdToMeeting[_meetId].nft).isHolder(_participant)) {
            revert DSuiteMeet_InvalidParticipant();
        }
        Meeting storage meet = meetIdToMeeting[_meetId];
        meet.participants.push(_participant);
        if (meet.owner != msg.sender) {
            revert DSuiteMeet_InvalidParticipant();
        }
        emit ParticipantAdded(_meetId, _participant);
        ParticipationNFT nft = meet.nft;
        uint256 tokenId = nft.createToken(_participant);
        return tokenId;
    }

    function getOwnerMeetings(address _owner) public view returns (uint256[] memory) {
        return ownerToMeetIds[_owner];
    }

    function meetIdToMeet(uint256 _id) public view returns (Meeting memory) {
        if (_id < meetId) {
            revert DSuiteMeet_InvalidID();
        }
        return meetIdToMeeting[_id];
    }

    function isOwner(address _owner, uint256 _id) public view returns (bool) {
        if ((meetIdToMeeting[_id].nft).getTokenId(_owner) == 1) {
            return true;
        }
        return false;
    }

    function isValidParticipant(address _participant, uint256 _id) public view returns (bool) {
        if ((meetIdToMeeting[_id].nft).isHolder(_participant) == true) {
            return true;
        }
        return false;
    }

    function getMeetingName(uint _id) public view returns(string memory){
        if(_id > meetId){
            revert DSuiteMeet_InvalidID();
        }
        return meetIdToMeeting[_id].name;
    }
}
