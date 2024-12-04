import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignup) {
      navigate("/shot"); 
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#1F1F1F] to-[#0ABAB5] text-white">
      <h1 className="text-8xl font-bold">Bienvenue</h1>
      <p className="mt-2 text-2xl">Rejoignez l'expérience de tir ultime</p>

      <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg mt-8 shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignup ? "Inscrivez-vous" : "Target Dummy"}
        </h2>

        <form 
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm mb-2">Username</label>
            <input
              type="text"
              placeholder="Inscrivez votre nom ici..."
              className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe..."
              className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {isSignup && (
            <div>
              <label className="block text-sm mb-2">Confirmez le mot de passe</label>
              <input
                type="password"
                placeholder="Confirmez votre mot de passe..."
                className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}

          {/* {!isSignup && (
            <div className="text-sm text-right">
              <a href="#" className="text-teal-400 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
          )} */}

          <button
            type="submit"
            className="w-full py-2 bg-teal-500 hover:bg-teal-600 rounded-full text-white font-semibold transition"
          >
            {isSignup ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          {isSignup ? (
            <>
              Vous avez déjà un compte ?{" "}
              <button
                onClick={toggleMode}
                className="text-teal-400 hover:underline"
              >
                Connectez-vous !
              </button>
            </>
          ) : (
            <>
              Pas de compte ?{" "}
              <button
                onClick={toggleMode}
                className="text-teal-400 hover:underline"
              >
                Inscrivez-vous !
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
