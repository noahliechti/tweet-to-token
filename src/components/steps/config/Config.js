import { Typography } from "@mui/material";
import ThemeToggle from "../themeToggle/ThemeToggle";
import LanguageInput from "../languageInput/LanguageInput";

function Config(props) {
  return (
    <>
      <Typography>
        Choose the theme and the language the Tweet should have.
      </Typography>
      <ThemeToggle handleConfigClick={props.handleConfigClick} />
      <LanguageInput handleConfigClick={props.handleConfigClick} />
    </>
  );
}

export default Config;
