const hre = require("hardhat");
const { addresses } = require("../artifacts/contracts/map");
const { printEtherscanLink } = require("./helper-functions");

const PINATA_REQUEST_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_HEADER = {
  // pinata_api_key: process.env("PINATA_API_KEY"),
  // pinata_secret_api_key: process.env("PINATA_API_SECRET"),
  pinata_api_key: "bcf45124693f5e75d98a",
  pinata_secret_api_key:
    "8ee813edb4afd77531ca0b37ca601ad6f62d2a0ab328d8a0f74ba61a84e961aa",
};

async function main() {
  const contractName = "TweetToken";
  const chainId = hre.network.config.chainId;
  const deployedContractAddress = addresses[chainId][contractName][0];
  printEtherscanLink(deployedContractAddress, chainId);

  const TTT = await ethers.getContractFactory(contractName);
  const ttt = await TTT.attach(deployedContractAddress);

  if (!(await ttt.saleIsActive())) {
    const saleState = await ttt.flipSaleState();
    await saleState.wait();
  }
  console.log("Sale state: ", await ttt.saleIsActive());
}

function getTokenURIHash() {}
function getFileName() {}
function uploadFileToPinata() {}

// print(PINATA_HEADER["pinata_api_key"])
// sample_token_uri = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=0-PUG.json"
// sample_tweet_id = 1478285768493834240
// sample_tweet_owner = "0xb16d1100b2b63ebcb9099912Dee01054eb31905b"

// def main():
//     account = get_account()
//     minter_account = accounts.add(config["wallet"]["minter_private_key"])
//     tweet_to_token = TweetToToken[-1]

//     print(f"Active network: {network.show_active()}")
//     print(f"From account: {account}")
//     print(f"Number of deployed TweetToToken contracts: {len(TweetToToken)}")

//     transaction = tweet_to_token.addVerifiedPost(
//         sample_tweet_owner, sample_tweet_id, get_tokenURI_hash(), {"from": account}
//     )
//     transaction.wait(1)
//     transaction = tweet_to_token.flipSaleState({"from": account})
//     transaction.wait(1)
//     transaction = tweet_to_token.createToken(sample_tweet_id, {"from": minter_account})
//     transaction.wait(1)

//     token_counter = tweet_to_token.tokenCounter()
//     print(f"Token counter: {token_counter}")
//     print(
//         "\nAwesome! You can view your NFT at {} or at {}".format(
//             OPENSEA_FORMAT.format(tweet_to_token.address, sample_tweet_id),
//             RARIBLE_FORMAT.format(tweet_to_token.address, sample_tweet_id),
//         )
//     )
//     print('\nPlease give up to 20 minutes, and hit the "refresh metadata" button')

// def get_tokenURI_hash():
//     image_path = f"./img/{sample_tweet_id}.png"
//     file_name = get_file_name(image_path)
//     ipfs_file_path = ""

//     with Path(image_path).open("rb") as fp:
//         binary = fp.read()
//         ipfs_file_path = upload_file_to_pinata(file_name, binary)

//     metadata = {
//         "name": "#1 from @Rainmaker1973",
//         "description": "Tweet by @Rainmaker1973 tweeted on 21.12.21. Original: https://twitter.com/Rainmaker1973/status/1478285768493834240",
//         "image": ipfs_file_path,
//         "attributes": [
//             {"trait_type": "likes", "value": 50},
//             {"trait_type": "retweets", "value": 13},
//             {"trait_type": "comments", "value": 3},
//             {"trait_type": "language", "value": "en"},
//         ],
//     }

//     return upload_file_to_pinata(f"{sample_tweet_id}.json", json.dumps(metadata))

// def get_file_name(path):
//     return path.split("/")[-1:][0]

// def upload_file_to_pinata(file_name, binary):
//     response = requests.post(
//         PINATA_REQUEST_URL,
//         files={"file": (file_name, binary)},
//         headers=PINATA_HEADER,
//     )
//     print("Pinata response", response.json())
//     return response.json()["IpfsHash"]
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
