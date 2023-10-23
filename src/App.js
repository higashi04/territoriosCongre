import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

//components
import Navibar from "./components/navbar/Navbar";
//pages
import Login from "./pages/Login/Login";
import Territorios from "./pages/Territorios/Territorios";

function App() {
  return (
    <>
      <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navibar/>}>
            <Route index element={<Territorios/>} />
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
