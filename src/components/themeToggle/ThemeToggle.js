import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

function ThemeToggle() {
  const [theme, setTheme] = React.useState("light");

  const handleChange = (event, newTheme) => {
    setTheme(newTheme);
  };
  return (
    <ToggleButtonGroup
      fullWidth
      value={theme}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="light" aria-label="light theme">
        Light
      </ToggleButton>
      <ToggleButton value="dark" aria-label="dark theme">
        Dark
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ThemeToggle;
