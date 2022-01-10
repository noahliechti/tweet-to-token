import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Creator from "./components/creator/Creator";
import { Grid, ThemeProvider, Container, CssBaseline } from "@mui/material";
import theme from "./config/theme";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* normalize and add custom global styles*/}
        <Header />
        <Container>
          <Grid container spacing={2}>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/create" element={<Creator></Creator>} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Grid>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
