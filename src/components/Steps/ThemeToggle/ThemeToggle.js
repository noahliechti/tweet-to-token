import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

function ThemeToggle({ defaultTheme, handleChange: propsChange }) {
  const [theme, setTheme] = React.useState(defaultTheme);

  const handleChange = (e, newTheme) => {
    setTheme(newTheme);
    propsChange(e.target);
  };
  return (
    <ToggleButtonGroup
      fullWidth
      value={theme}
      exclusive
      onChange={handleChange}
      size="large"
      sx={{ mt: 2 }}
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
