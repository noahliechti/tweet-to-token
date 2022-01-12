import { Typography } from "@mui/material";
import ThemeToggle from "../themeToggle/ThemeToggle";
import LanguageInput from "../languageInput/LanguageInput";

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
