import { BrowserRouter as Router, Route, Link, Routes, } from "react-router-dom";
import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Player from "../components/MusicPlayer";
import Navbar from "../components/Navbar";
// import ForgotPassword from "../features/Authentication/ForgotPassword";
import PageNotFound from "../components/reusableComponents/PageNotFound";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const App = () => {
    const token = window.localStorage.getItem('token');
    console.log(token)
    return (
        <Router>
            <Routes>
                {token &&
                    <Route exact path="/" element={<Navbar />} />
                }

                <Route path="/" element={token ? <Login /> : <Navbar />} />
                <Route path="/main" element={<Navbar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};
export default App;
