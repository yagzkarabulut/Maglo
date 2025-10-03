import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordReg = /^.{6,}$/; // en az 6 karakter

const LoginForm = () => {
  const [users, setUsers] = useState([])
  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const email = (form.elements.namedItem("email")?.value || "").trim();
    const password = form.elements.namedItem("password")?.value || "";

    const newUser = { id: Date.now(), email, password };
    setUsers((prev) => [...prev, newUser]);

    const emailInvalid = !emailReg.test(email);
    const passInvalid = !passwordReg.test(password);

    setMailError(emailInvalid);
    setPasswordError(passInvalid);

    if (emailInvalid || passInvalid) return;

    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard", {
        replace: true,
        state: { from: "login", users },
      });
    }, 2000);
  };
  console.log(users)

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-16 mb-4 w-full" noValidate>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 via-gray-500 to-gray-900 bg-clip-text text-transparent mb-8">
          MAGLO
        </h1>

        {/* E-posta */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Mail Adresiniz:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="E-posta adresiniz"
            className={`shadow appearance-none border rounded w-full max-w-lg py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              mailError ? "border-red-500" : ""
            }`}
            aria-invalid={mailError}
            aria-describedby={mailError ? "email-err" : undefined}
            disabled={loading}
          />
          {mailError && (
            <p id="email-err" className="m-2 text-xs px-2 py-1 rounded-3xl text-red-600">
              Lütfen geçerli bir e-posta adresi giriniz.
            </p>
          )}
        </div>

        {/* Şifre */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Şifreniz:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="******************"
            className={`shadow appearance-none border rounded w-full max-w-lg py-3 px-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              passwordError ? "border-red-500" : ""
            }`}
            aria-invalid={passwordError}
            aria-describedby={passwordError ? "password-err" : undefined}
            disabled={loading}
          />
          {passwordError && (
            <p id="password-err" className="m-2 text-xs px-2 py-1 rounded-3xl text-red-600">
              Lütfen geçerli bir şifre giriniz (en az 6 karakter).
            </p>
          )}
        </div>

        <div className="flex items-center justify-start gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 disabled:hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            aria-busy={loading}
            aria-live="polite"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block animate-spin" />
                Giriş yapılıyor…
              </span>
            ) : (
              "Giriş Yap"
            )}
          </button>

          <button
            type="button"
            disabled={loading}
            className="bg-gray-400 hover:bg-gray-500 disabled:opacity-60 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            Kayıt Ol
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
