import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

//components
import Navibar from "./components/navbar/Navbar";
//pages
import Login from "./pages/Login/Login";
import LoggedIn from "./pages/LoggedInWelcome/LoggedIn";
import Register from "./pages/Register/Register";
import Territorios from "./pages/Territorios/Territorios";
import Congregacion from "./pages/Congregacion/Congregacion";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
      
    <Navibar/>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}>
            
          </Route>
          <Route path="/LoggedIn" element={<LoggedIn/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Territorios" element={<Territorios/>}/>
          <Route path="/Congregacion" element={<Congregacion/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
