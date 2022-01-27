import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

function ThemeToggle(props) {
  const [theme, setTheme] = React.useState(props.defaultTheme);

  const handleChange = (e, newTheme) => {
    setTheme(newTheme);
    props.handleChange(e.target);
  };
  return (
    <ToggleButtonGroup
      fullWidth
      value={theme}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton name="theme" value="light" aria-label="light theme">
        Light
      </ToggleButton>
      <ToggleButton name="theme" value="dark" aria-label="dark theme">
        Dark
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ThemeToggle;
