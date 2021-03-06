import { createTheme } from "@mui/material";

const basicTheme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "Verdana",
      "BlinkMacSystemFont",
      "-apple-system",
    ].join(","),
    h1: {
      fontWeight: "bold",
      lineHeight: "122.19%",
    },
    h2: {
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontStyle: "italic",
      marginTop: 56,
      marginBottom: 16,
    },
    h3: {
      fontSize: 21,
      fontWeight: "bold",
    },
    subtitle1: {
      fontWeight: 200,
      lineHeight: "130%",
      letterSpacing: "0.045em",
    },
    body1: {
      fontSize: 18,
    },
  },
  palette: {
    primary: {
      main: "#3849DD",
    },
    secondary: {
      main: "#00D2C6",
    },
    white: {
      main: "rgba(255, 255, 255, 0.932)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    black: {
      main: "rgba(0, 0, 0, 0.87)",
      contrastText: "rgba(255, 255, 255, 0.932)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          fontSize: 24,
        },
        sizeLarge: {
          fontSize: 27,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          backgroundColor: "rgba(255, 255, 255, 0.932)",
          color: "rgba(0, 0, 0, 0.87)",
          paddingTop: 16,
          paddingBottom: 16,
          minWidth: 320,
          minHeight: "100%",
        },
        code: {
          padding: ".2em .4em",
          margin: 0,
          fontSize: "85%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          borderRadius: 8,
        },
      },
    },
  },
});

const theme = createTheme(basicTheme, {
  typography: {
    h1: {
      [basicTheme.breakpoints.only("xs")]: {
        fontSize: 66,
      },
      [basicTheme.breakpoints.only("sm")]: {
        fontSize: 68,
      },
      [basicTheme.breakpoints.only("md")]: {
        fontSize: 54,
      },
      [basicTheme.breakpoints.up("lg")]: {
        fontSize: 71,
      },
    },
  },
});

export default theme;
