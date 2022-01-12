import { Typography } from "@mui/material";
import ThemeToggle from "../themeToggle/ThemeToggle";
import LanguageInput from "../languageInput/LanguageInput";

function Config({ defaultTheme, handleConfigClick, defaultLanguage }) {
  return (
    <>
      <Typography>
        Choose the theme and the language the Tweet should have.
      </Typography>
      <ThemeToggle
        defaultTheme={defaultTheme}
        handleConfigClick={handleConfigClick}
      />
      <LanguageInput
        handleConfigClick={handleConfigClick}
        defaultLanguage={defaultLanguage}
      />
    </>
  );
}

export default Config;
