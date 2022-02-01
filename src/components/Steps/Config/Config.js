import { Typography } from "@mui/material";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageInput from "../LanguageInput/LanguageInput";

function Config({ defaultTheme, handleChange, defaultLanguage }) {
  return (
    <>
      <Typography>
        Choose the theme and the language the Tweet should have.
      </Typography>
      <ThemeToggle defaultTheme={defaultTheme} handleChange={handleChange} />
      <LanguageInput
        handleChange={handleChange}
        defaultLanguage={defaultLanguage}
      />
    </>
  );
}

export default Config;
