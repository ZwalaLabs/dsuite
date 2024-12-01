//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ParticipationNFT is ERC721 {
    uint256 private tokenID = 0;
    mapping(address => uint256) addressToId;

    constructor(address _owner, string memory _name, string memory _ticker) ERC721(_name, _ticker) {
        ++tokenID;
        addressToId[_owner] = tokenID;
        _mint(_owner, tokenID);
    }

    function getTokenId(address _holder) public view returns (uint256) {
        // if (addressToId[_holder] == 0) {
        //     //Error to be added
        //     revert();
        // }
        return addressToId[_holder];
    }

    function isHolder(address _holder) public view returns (bool) {
        if (addressToId[_holder] == 0) {
            return false;
        }
        return true;
    }

    function createToken(address _receiver) public returns (uint256) {
        tokenID++;
        addressToId[_receiver] = tokenID;
        _mint(_receiver, tokenID);
        return tokenID;
    }
}
