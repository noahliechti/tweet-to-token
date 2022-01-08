import "./App.scss";
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
import Creator from "./components/creator/Creator";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<div>landing</div>} />
        <Route path="/create" element={<Creator></Creator>} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        {/* <Route path="/home" element={<div>home</div>} /> */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
