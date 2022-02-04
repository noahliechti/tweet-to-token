import { Typography, Box } from "@mui/material";

export const BASE_URL =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:5000"
    : "https://tweet-token.netlify.app";

export const FUNCTIONS_PREFIX = "/.netlify/functions";

export const cardsContent = [
  {
    title: "🎩 Celebrity who wants to connect with fans",
    text: "Whether you are verified or not, it is always good to give back to the community.",
  },
  {
    title: "🎉 NFT-beginner minting his first NFT",
    text: "With our platform we made it easy to create your first NFT, even if you aren't very technical. ",
  },
  {
    title: "📚 Twitter poet looking to monetize his work",
    text: "Your tweets are art. Our platform allows you to generate an additional income stream.",
  },
];

export const milestones = [{}]; // TODO:

export const faqs = [
  { title: "What is MetaMask and how can I set it up", details: `` },
  {
    title: "Why do I have to sign in with Twitter?",
    details:
      "By signing in with Twitter we can ensure, that users only can mint their own tweets.",
  },
  {
    title: "How can I find the link of a Tweet?",
    details: (
      <>
        <Typography>
          Finding the link to a Tweet you want to share isn't obvious, but it's
          also not difficult. Here is an easy method.
        </Typography>
        <ol>
          <li>Navigate to the Tweet</li>
          <li>Open the Share Menu</li>
          <li>Click the "Copy link to Tweet" Option</li>
        </ol>
        <Typography>Check if your link has the following format:</Typography>
        <Box sx={{ width: 1, wordWrap: "break-word" }}>
          <code>
            https://twitter.com/YourUsername/status/SomeRandomBigNumber
          </code>
        </Box>
      </>
    ),
  },
];

export const languages = [
  { code: "ar", label: "Arabic" },
  { code: "ar-x-fm", label: "Arabic (Feminine)" },
  { code: "bn", label: "Bangla" },
  { code: "eu", label: "Basque" },
  { code: "bg", label: "Bulgarian" },
  { code: "ca", label: "Catalan" },
  { code: "hr", label: "Croatian" },
  { code: "cs", label: "Czech" },
  { code: "da", label: "Danish" },
  { code: "nl", label: "Dutch" },
  { code: "en", label: "English" },
  { code: "fi", label: "Finnish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "el", label: "Greek" },
  { code: "gu", label: "Gujarati" },
  { code: "he", label: "Hebrew" },
  { code: "hi", label: "Hindi" },
  { code: "hu", label: "Hungarian" },
  { code: "id", label: "Indonesian" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  { code: "kn", label: "Kannada" },
  { code: "ko", label: "Korean" },
  { code: "mr", label: "Marathi" },
  { code: "no", label: "Norwegian" },
  { code: "fa", label: "Persian" },
  { code: "pl", label: "Polish" },
  { code: "pt", label: "Portuguese" },
  { code: "ro", label: "Romanian" },
  { code: "ru", label: "Russian" },
  { code: "sr", label: "Serbian" },
  { code: "zh-cn", label: "Simplified Chinese" },
  { code: "sk", label: "Slovak" },
  { code: "es", label: "Spanish" },
  { code: "sv", label: "Swedish" },
  { code: "ta", label: "Tamil" },
  { code: "th", label: "Thai" },
  { code: "zh-tw", label: "Traditional Chinese" },
  { code: "tr", label: "Turkish" },
  { code: "uk", label: "Ukrainian" },
  { code: "ur", label: "Urdu" },
  { code: "vi", label: "Vietnamese" },
];
