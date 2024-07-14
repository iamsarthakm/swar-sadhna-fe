import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Player from "../components/MusicPlayer";
import Navbar from "../components/Navbar";
// import ForgotPassword from "../features/Authentication/ForgotPassword";
import PageNotFound from "../components/reusableComponents/PageNotFound";

const PrivateRoute = ({ element }) => {
    let token = window.localStorage.getItem('token');
    console.log(token, typeof (token))
    // token = 1
    return token == "null" || token == null ? <Navigate to="/login" /> : element;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute element={<Navbar />} />} />
                <Route path="/main" element={<PrivateRoute element={<Navbar />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
