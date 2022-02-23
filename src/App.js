import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import theme from "./config/theme";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";

// eslint-disable-next-line no-console
console.log(
  "%c👨🏽‍💻 Found a bug? Please open an issue here: https://github.com/noahliechti/tweet-to-token/issues",
  "font-size:20px"
);

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  const minter = new ethers.Wallet(
    process.env.REACT_APP_MINTER_PRIVATE_KEY,
    library
  );
  return minter;
}

function App() {
  return (
    <Router className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* normalize and add custom global styles */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </Web3ReactProvider>
    </Router>
  );
}

export default App;
