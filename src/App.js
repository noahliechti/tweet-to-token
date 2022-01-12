import Home from "./components/Home/Home";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./config/theme";

function App() {
  return (
    <Router className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* normalize and add custom global styles*/}
        <Routes>
          <Route path="/" element={<Home></Home>} />
          {/* TODO: add a 404 page*/}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
