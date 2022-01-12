import React, { useRef } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

function LanguageInput(props) {
  const ref0 = useRef();

  const [language, setLanguage] = React.useState(
    languages.find((l) => l.code === props.defaultLanguage)
  );

  const handleChange = (e, newValue, reason) => {
    setLanguage(newValue);
    props.handleChange({
      name: ref0.current.getAttribute("name"),
      value: reason === "clear" ? "" : newValue.code,
    });
  };

  return (
    <Autocomplete
      options={languages}
      autoHighlight
      ref={ref0}
      name="language"
      value={language}
      sx={{ mt: 2 }}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" value={option.code} {...props}>
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          label="Choose a language"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill TODO: what is this?
          }}
        />
      )}
    />
  );
}

export default LanguageInput;

const languages = [
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
