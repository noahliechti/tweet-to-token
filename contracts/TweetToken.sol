// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract TweetToken is ERC721, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;

    bool public saleIsActive;
    string public baseURI;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");

    Counters.Counter private _tokenCounter;

    event TokenCreated(
        uint256 indexed tweetId,
        string tokenURI,
        address indexed minter
    );

    constructor(string memory _newBaseURI) ERC721("tweettoken.io", "TTT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);

        baseURI = _newBaseURI;
        saleIsActive = false;
    }

    function mintTweet(
        address _account,
        uint256 _tweetId,
        string memory _tokenURI
    ) external onlyRole(MINTER_ROLE) returns (uint256) {
        require(saleIsActive, "Minting is paused");

        _tokenCounter.increment();
        _safeMint(_account, _tweetId); // checks if id is already minted
        _setTokenURI(_tweetId, _tokenURI);

        emit TokenCreated(_tweetId, _tokenURI, _account);
        return _tweetId;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI)
        external
        onlyRole(URI_SETTER_ROLE)
        returns (string memory)
    {
        return baseURI = _newBaseURI;
    }

    function flipSaleState() external onlyRole(PAUSER_ROLE) returns (bool) {
        return saleIsActive = !saleIsActive;
    }

    function getTokenCount() public view returns (uint256) {
        return _tokenCounter.current();
    }

    // The following functions are overrides required by Solidity.

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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
