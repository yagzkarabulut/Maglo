import React from "react";
import LoginForm from "./components/LoginForm";
import loginImg from "../../assets/loginImg.jpg";
import Header from "../../components/ui/Header";

const LoginScreen = () => {
  return (
  <>
    <Header />
    <div className="min-h-screen flex md:flex-row items-center justify-center  p-6">
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-xl">
          <LoginForm />
        </div>
      </div>
      <div className="hidden md:block ">
        <img
          src={loginImg}
          alt="Login görseli"
          className="w-full max-w-md rounded-lg object-cover"
        />
      </div>
      
    </div>
  </>
  );
};

export default LoginScreen;
