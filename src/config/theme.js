import { createTheme } from "@mui/material";
// import { grey } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "Verdana",
      "BlinkMacSystemFont",
      "-apple-system",
    ].join(","),
    h1: 40,
    h2: {
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontStyle: "italic",
      marginTop: 56,
      marginBottom: 16,
    },
    // fontSize: 5,
    // subtitle1: {
    //   fontSize: 15,
    // },
    button: {
      fontSize: 24,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgba(255, 255, 255, 0.932)",
          color: "rgba(0, 0, 0, 0.87)",
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
