import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lineImg from "../../../assets/line.JPG";

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordReg = /^.{6,}$/; // en az 6 karakter

const LoginForm = () => {
  const [users, setUsers] = useState([]);
  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("fullname")?.value || "").trim();
    const email = (form.elements.namedItem("email")?.value || "").trim();
    const password = form.elements.namedItem("password")?.value || "";
    setNameError(!name);
    setMailError(!emailReg.test(email));
    setPasswordError(!passwordReg.test(password));
    if (!name || !emailReg.test(email) || !passwordReg.test(password)) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard", {
        replace: true,
        state: { from: "login", userName: name, email },
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-0 sm:p-0 md:p-0 rounded-lg pb-10" noValidate>
      <h1 className="text-3xl font-semibold  mb-2">Create new account</h1>
      <p className="text-gray-500 mb-6 ">Welcome back! Please enter your details</p>

      {/* Full Name */}
      <div className="mb-4">
        <label htmlFor="fullname" className="block text-gray-700 text-sm font-semibold mb-1">Full Name</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          autoComplete="name"
          placeholder="Mahfuzul Nabil"
          className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 bg-gray-50 ${nameError ? "border-red-500" : "border-gray-300"}`}
          aria-label="Full Name"
          aria-invalid={nameError}
          aria-describedby={nameError ? "name-err" : undefined}
          disabled={loading}
        />
        {nameError && (
          <p id="name-err" className="text-xs text-red-600 mt-1">Please enter your name.</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="example@gmail.com"
          className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 bg-gray-50 ${mailError ? "border-red-500" : "border-gray-300"}`}
          aria-label="Email"
          aria-invalid={mailError}
          aria-describedby={mailError ? "email-err" : undefined}
          disabled={loading}
        />
        {mailError && (
          <p id="email-err" className="text-xs text-red-600 mt-1">Please enter a valid email address.</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300 bg-gray-50 ${passwordError ? "border-red-500" : "border-gray-300"}`}
          aria-label="Password"
          aria-invalid={passwordError}
          aria-describedby={passwordError ? "password-err" : undefined}
          disabled={loading}
        />
        {passwordError && (
          <p id="password-err" className="text-xs text-red-600 mt-1">Password must be at least 6 characters.</p>
        )}
      </div>

     <button
  type="submit"
  disabled={loading}
  id="submitBtn"
  className="w-full cursor-pointer transition-colors text-black py-3 rounded-lg mb-3 text-lg shadow-sm bg-lime-400 hover:bg-amber-600"
  aria-busy={loading}
  aria-label="Create Account"
>
  {loading ? "Creating..." : "Create Account"}
</button>

      <div className="mb-6">
        <button
          type="button"
          disabled={loading}
          className="w-full cursor-pointer flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-700 font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          aria-label="Sign up with Google"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_17_40)"><path d="M47.532 24.552c0-1.636-.147-3.2-.42-4.704H24.48v9.02h13.02c-.56 2.98-2.24 5.5-4.76 7.2v5.98h7.7c4.5-4.14 7.09-10.24 7.09-17.496z" fill="#4285F4"/><path d="M24.48 48c6.48 0 11.92-2.14 15.89-5.82l-7.7-5.98c-2.14 1.44-4.88 2.3-8.19 2.3-6.3 0-11.64-4.26-13.56-9.98H2.67v6.24C6.62 43.98 14.88 48 24.48 48z" fill="#34A853"/><path d="M10.92 28.52c-.5-1.44-.8-2.98-.8-4.52s.3-3.08.8-4.52v-6.24H2.67A23.97 23.97 0 000 24c0 3.98.96 7.76 2.67 11.02l8.25-6.5z" fill="#FBBC05"/><path d="M24.48 9.5c3.54 0 6.68 1.22 9.16 3.62l6.84-6.84C36.4 2.14 30.96 0 24.48 0 14.88 0 6.62 4.02 2.67 10.98l8.25 6.5c1.92-5.72 7.26-9.98 13.56-9.98z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>
          Sign up with google
        </button>
      </div>

      <div className="text-center text-gray-500 text-sm relative">
        Already have an account?{" "}
        <a href="#" className="text-gray-900 font-semibold hover:underline inline-block relative pb-3">
          Sign in
          <img src={lineImg} alt="line" className="mx-auto w-14 h-2 absolute left-1/2 -translate-x-1/2 bottom-[-6px] select-none pointer-events-none" />
        </a>
      </div>
    </form>
  );
};

export default LoginForm;