export const BASE_URL =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:5000"
    : "https://tweet-token.netlify.app";

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
      link = "https://etherscan.io/";
      break;
    case 4:
      link = "https://rinkeby.etherscan.io/";
      break;
    case 1337:
      // TODO:
      break;
    default:
      break;
  }
  return `${link}/${type}/${address}`;
};

export const languages = [
  { code: "ar", label: "Arabic" },
  // { code: "ar-x-fm", label: "Arabic (Feminine)" },
  // { code: "bg", label: "Bulgarian" },
  { code: "bn", label: "Bangla" },
  // { code: "ca", label: "Catalan" },
  { code: "cs", label: "Czech" },
  { code: "da", label: "Danish" },
  { code: "de", label: "German" },
  // { code: "eu", label: "Basque" },
  { code: "el", label: "Greek" },
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fa", label: "Persian" },
  { code: "fi", label: "Finnish" },
  { code: "fil", label: "Filipino" },
  { code: "fr", label: "French" },
  // { code: "gu", label: "Gujarati" },
  { code: "he", label: "Hebrew" },
  { code: "hi", label: "Hindi" },
  // { code: "hr", label: "Croatian" },
  { code: "hu", label: "Hungarian" },
  { code: "id", label: "Indonesian" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  // { code: "kn", label: "Kannada" },
  { code: "ko", label: "Korean" },
  { code: "msa", label: "Malay" },
  // { code: "mr", label: "Marathi" },
  { code: "nl", label: "Dutch" },
  { code: "no", label: "Norwegian" },
  { code: "pl", label: "Polish" },
  { code: "pt", label: "Portuguese" },
  { code: "ro", label: "Romanian" },
  { code: "ru", label: "Russian" },
  // { code: "sr", label: "Serbian" },
  // { code: "sk", label: "Slovak" },
  { code: "sv", label: "Swedish" },
  // { code: "ta", label: "Tamil" },
  { code: "th", label: "Thai" },
  { code: "tr", label: "Turkish" },
  { code: "uk", label: "Ukrainian" },
  { code: "ur", label: "Urdu" },
  { code: "vi", label: "Vietnamese" },
  { code: "zh-cn", label: "Simplified Chinese" },
  { code: "zh-tw", label: "Traditional Chinese" },
];
