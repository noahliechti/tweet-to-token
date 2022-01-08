import "./App.scss";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Creator from "./Components/Creator/Creator";
import { Container } from "@mui/material";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router className="App">
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/create" element={<Creator></Creator>} />
          {/* <Route path="/home" element={<div>home</div>} /> */}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
