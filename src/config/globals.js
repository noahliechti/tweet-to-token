export const BASE_URL =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:5000"
    : "https://tweettoken.io";

export const FUNCTIONS_PREFIX = "/.netlify/functions";

export const ALERT_CODES = {
  UNSUP: 1,
  LOGOUT: 2,
  NOMM: 3,
  NOTDEP: 4,
};

export const CHAIN_ID_MAPPING = {
  1: "Mainnet",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
};

export const ETHERSCAN_URL = (chainId, type, address) => {
  let link = "";
  switch (chainId) {
    case 1:
      link = "https://etherscan.io";
      break;
    case 4:
      link = "https://rinkeby.etherscan.io";
      break;
    default:
      return "https://etherscan.io";
  }
  return `${link}/${type}/${address}`;
};

// TODO: DRY
const getTweetId = (tweetURL) => {
  const splitTweetURL = tweetURL.split("/");
  const lastItem = splitTweetURL[splitTweetURL.length - 1];
  const splitLastItem = lastItem.split("?");
  return splitLastItem[0];
};

export const URL_TO_TWEET_ID = (tweetURL) => getTweetId(tweetURL);

// eslint-disable-next-line arrow-body-style
export const OPENSEA_TWEET_URL = (chainId, contract, tweetId) => {
  return `https://${chainId === 1 ? "" : "testnets."}opensea.io/assets/${
    contract.address
  }/${tweetId}`;
};

export const languages = [
  { code: "ar", label: "Arabic" },
  { code: "bn", label: "Bangla" },
  { code: "cs", label: "Czech" },
  { code: "da", label: "Danish" },
  { code: "nl", label: "Dutch" },
  { code: "en", label: "English" },
  { code: "fi", label: "Finnish" },
  { code: "fil", label: "Filipino" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "el", label: "Greek" },
  { code: "he", label: "Hebrew" },
  { code: "hi", label: "Hindi" },
  { code: "hu", label: "Hungarian" },
  { code: "id", label: "Indonesian" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "msa", label: "Malay" },
  { code: "no", label: "Norwegian" },
  { code: "fa", label: "Persian" },
  { code: "pl", label: "Polish" },
  { code: "pt", label: "Portuguese" },
  { code: "ro", label: "Romanian" },
  { code: "ru", label: "Russian" },
  { code: "zh-cn", label: "Simplified Chinese" },
  { code: "es", label: "Spanish" },
  { code: "sv", label: "Swedish" },
  { code: "th", label: "Thai" },
  { code: "zh-tw", label: "Traditional Chinese" },
  { code: "tr", label: "Turkish" },
  { code: "uk", label: "Ukrainian" },
  { code: "ur", label: "Urdu" },
  { code: "vi", label: "Vietnamese" },
];
