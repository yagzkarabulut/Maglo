

import React from "react";
import LoginForm from "./components/LoginForm";
import loginImg from "../../assets/login.JPG";
import logoImg from "../../assets/logo.JPG";

const LoginScreen = () => {
  return (
  <div className="min-h-screen h-screen flex flex-col md:flex-row">
      {/* Sol: Form */}
      <div className="flex flex-1 flex-col justify-between items-center bg-white px-4 sm:px-8 md:px-16 py-8 h-full">
        {/* Logo */}
        <div className="w-full mt-[50px] max-w-md  flex items-center pt-10 ">
          <img src={logoImg} alt="Maglo Logo" className="h-10 w-10 mr-2" />
          <span className="text-2xl font-bold text-gray-900">Maglo.</span>
        </div>
        <div className="w-full max-w-md flex-1 flex flex-col justify-center">
          <LoginForm />
        </div>
        <div className="h-8" />
      </div>
      {/* Sağ: Görsel */}
      <div className="hidden md:flex flex-1 bg-gray-100 min-h-screen">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default LoginScreen;
