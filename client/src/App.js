import { BrowserRouter, Routes, Route } from "react-router-dom";
// import GlobalStyles from "../GlobalStyles";
import styled from "styled-components";
import Home from "./components/Home";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
    {/* <GlobalStyles/> */}
        <Header/>
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
