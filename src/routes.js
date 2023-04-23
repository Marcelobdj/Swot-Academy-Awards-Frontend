import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VotingPage from "./pages/VotingPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";

const RoutesConfig = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/voting-page" element={<VotingPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
    </Router>
);

export default RoutesConfig;