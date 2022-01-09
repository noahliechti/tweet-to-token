import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "Verdana",
      "BlinkMacSystemFont",
      "-apple-system",
    ].join(","),
    fontSize: 5,
    subtitle1: {
      fontSize: 15,
    },
    button: {
      fontSize: 20,
    },
  },
});

export default theme;
