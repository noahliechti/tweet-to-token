import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers"; // TODO: very big
import theme from "./config/theme";
import Home from "./components/Home/Home";

function getLibrary(provider) {
  const library = new Web3Provider(provider, "any");
  // library.pollingInterval = 15000; TODO: what's this?
  return library;
}
function App() {
  return (
    <Router className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* normalize and add custom global styles */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </ThemeProvider>
      </Web3ReactProvider>
    </Router>
  );
}

export default App;
