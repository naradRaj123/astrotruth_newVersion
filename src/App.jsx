import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import HomePage from "@/pages/HomePage";
import { AuthProvider } from "@/contexts/AuthContext";
import UserDashboard from "./pages/UserDashboard";
import Layouts from "./pages/Layouts";
import AstrologerDashboard from "./pages/AstrologerDashboard";
import AstrologerRegistrationPage from "./pages/AstrologerRegistrationPage";
import AstroLogin from "./pages/AstroLogin";


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Layouts>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-login" element={<LoginPage />} />
            <Route path="/astro-login" element={<AstroLogin />} /> 
            <Route path="/user-register" element={<RegisterPage />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/astro-dashboard" element={<AstrologerDashboard />} /> 
            <Route path="/astro-register" element={<AstrologerRegistrationPage />} /> 
          </Routes>
        </Layouts>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
