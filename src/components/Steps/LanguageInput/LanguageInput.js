import React, { useRef } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { languages } from "../../../config/globals";

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
