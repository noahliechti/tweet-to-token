// SPDX-License-Identifier: MIT
pragma solidity 0.8.6; // TODO: which version?

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // TODO: needed?
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract TweetToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter; // TODO: public or private?
    bool public saleIsActive;
    string public baseURI;

    mapping(address => uint256) private addressTotweetId;
    mapping(uint256 => string) public tweetIdToTokenURI;

    event tokenCreated(uint256 indexed tweetId, string tokenURI);
    event postVerified(address account, uint256 indexed tweetId);

    // TODO: burn vs set tokenuri to null
    // TODO: what would be if I had a private mapping of the addresses?

    constructor(string memory _newBaseURI) ERC721("TweetToken", "TTT") {
        baseURI = _newBaseURI;
        saleIsActive = false;
    }

    function mintTweet(uint256 tweetId) public returns (uint256) {
        // TODO: only allow to mint once -> how can I look trough minted ids?
        require(saleIsActive, "Minting is paused");
        require(
            addressTotweetId[msg.sender] == tweetId,
            "You are not allowed to mint this tweet"
        );

        _safeMint(msg.sender, tweetId); // checks if id is already minted
        _tokenCounter.increment();

        _setTokenURI(tweetId, tweetIdToTokenURI[tweetId]);

        // TODO: delete account from mapping -> do people still see the address in the history?

        emit tokenCreated(tweetId, tweetIdToTokenURI[tweetId]);
        return tweetId;
    }

    // TODO: DO I HAVE TO PAY FOR THIS? HOW CAN I MAKE THE USER PAY FOR IT?
    function addVerifiedTweet(
        address _account,
        uint256 _tweetId,
        string memory _tokenURI
    ) public onlyOwner {
        addressTotweetId[_account] = _tweetId;
        tweetIdToTokenURI[_tweetId] = _tokenURI;
        // emit addressVerified(_account, _tweetId); // TODO: what about privacy
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI)
        public
        onlyOwner
        returns (string memory)
    {
        return baseURI = _newBaseURI;
    }

    function flipSaleState() public onlyOwner returns (bool) {
        return saleIsActive = !saleIsActive;
    }

    function getTokenCount() public view returns (uint256) {
        return _tokenCounter.current();
    }

    // function withdraw() public onlyOwner {
    //     uint256 balance = address(this).balance;
    //     msg.sender.transfer(balance);
    // }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
