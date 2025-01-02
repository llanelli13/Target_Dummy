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
    <div 
      className="h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat text-white" 
      style={{ backgroundImage: `url('background.jpg')` }} // Remplacez "your-image.jpg" par le nom de votre image
    >
      <h1 className="text-9xl font-title font-bold">Bienvenue</h1>
      <p className="mt-2 text-2xl font-secondary">Rejoignez l'expérience de tir ultime</p>

      <div className="bg-primaryBrown bg-opacity-70 p-8 rounded-2xl mt-8 shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-black font-title mb-6">
          {isSignup ? "Inscrivez-vous" : "Target Dummy"}
        </h2>

        <form 
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm text-black font-semibold font-secondary mb-2">Username</label>
            <input
              type="text"
              placeholder="Inscrivez votre nom ici..."
              className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
            />
          </div>

          <div>
            <label className="block text-sm text-black font-semibold font-secondary mb-2">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe..."
              className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
            />
          </div>

          {isSignup && (
            <div>
              <label className="block text-sm text-black font-semibold font-secondary mb-2">Confirmez le mot de passe</label>
              <input
                type="password"
                placeholder="Confirmez votre mot de passe..."
                className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
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
            className="w-full py-2 bg-secondaryPale hover:bg-primaryBrown rounded-full text-black font-bold font-secondary transition"
          >
            {isSignup ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 text-sm text-black font-secondary text-center">
          {isSignup ? (
            <>
              Vous avez déjà un compte ?{" "}
              <button
                onClick={toggleMode}
                className="text-white font-secondary hover:underline"
              >
                Connectez-vous !
              </button>
            </>
          ) : (
            <>
              Pas de compte ?{" "}
              <button
                onClick={toggleMode}
                className="text-white font-secondary hover:underline"
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
