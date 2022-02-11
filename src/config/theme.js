import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "Verdana",
      "BlinkMacSystemFont",
      "-apple-system",
    ].join(","),
    h1: {
      fontSize: 73,
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
      // defaultProps: {
      //   // The props to change the default for.
      //   disableRipple: true, // No more ripple!
      // },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgba(255, 255, 255, 0.932)",
          color: "rgba(0, 0, 0, 0.87)", // TODO: make color of palette
          paddingTop: 16,
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

export default theme;
