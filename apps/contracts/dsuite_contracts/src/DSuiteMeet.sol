//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ParticipationNFT} from "./ParticipationNFT.sol";

contract DSuiteMeet {
    uint256 private meetId = 0;

    struct Meeting {
        uint256 id;
        ParticipationNFT nft;
        address owner;
        address[] participants;
    }

    mapping(uint256 => Meeting) meetIdToMeeting;
    mapping(address => uint256[]) ownerToMeetIds;
    mapping(address => mapping(uint256 => bool)) isParticipant;

    function createMeet(string memory _event) public returns (uint256) {
        meetId++;
        //Events to be added
        ParticipationNFT newNFT = new ParticipationNFT(msg.sender, _event, _event);
        Meeting memory newMeeting =
            Meeting({id: meetId, nft: newNFT, owner: msg.sender, participants: new address[](0)});
        meetIdToMeeting[meetId] = newMeeting;
        ownerToMeetIds[msg.sender].push(meetId);

        return meetId;
    }

    function invite(address _participant, uint256 _meetId) public returns (uint256) {
        if (_meetId > meetId || _participant == msg.sender || (meetIdToMeeting[_meetId].nft).isHolder(_participant)) {
            //Error to be added
            revert();
        }
        Meeting storage meet = meetIdToMeeting[_meetId];
        meet.participants.push(_participant);
        if (meet.owner != msg.sender) {
            revert();
        }
        ParticipationNFT nft = meet.nft;
        uint256 tokenId = nft.createToken(_participant);
        return tokenId;
    }

    function getOwnerMeetings(address _owner) public view returns (uint256[] memory) {
        return ownerToMeetIds[_owner];
    }

    function meetIdToMeet(uint256 _id) public view returns (Meeting memory) {
        if (_id < meetId) {
            //Error to be added
            revert();
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
}
