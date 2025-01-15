// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


// const LoginPage = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const navigate = useNavigate();

//   const toggleMode = () => {
//     setIsSignup((prev) => !prev);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isSignup) {
//       navigate("/shot"); 
//     }
//   };

//   return (
//     <div 
//       className="h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat text-white" 
//       style={{ backgroundImage: `url('background.jpg')` }} 
//     >
//       <div>
//         <img src="/Logo.png" alt="Logo" className="h-48" />
//       </div>
      
//       <h1 className="text-9xl font-title font-bold -mt-12">Target Dummy</h1>
//       <p className="mt-2 text-2xl font-secondary">Rejoignez l'expérience de tir ultime</p>

//       <div className="bg-primaryBrown bg-opacity-70 p-8 rounded-2xl mt-8 shadow-lg w-96">
//         <h2 className="text-3xl font-bold text-center text-black font-title mb-6">
//           {isSignup ? "Inscrivez-vous" : "Target Dummy"}
//         </h2>

//         <form 
//             onSubmit={handleSubmit}
//             className="flex flex-col space-y-4">
//           <div>
//             <label className="block text-sm text-black font-semibold font-secondary mb-2">Username</label>
//             <input
//               type="text"
//               placeholder="Inscrivez votre nom ici..."
//               className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-black font-semibold font-secondary mb-2">Mot de passe</label>
//             <input
//               type="password"
//               placeholder="Mot de passe..."
//               className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
//             />
//           </div>

//           {isSignup && (
//             <div>
//               <label className="block text-sm text-black font-semibold font-secondary mb-2">Confirmez le mot de passe</label>
//               <input
//                 type="password"
//                 placeholder="Confirmez votre mot de passe..."
//                 className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
//               />
//             </div>
//           )}

//           {/* {!isSignup && (
//             <div className="text-sm text-right">
//               <a href="#" className="text-teal-400 hover:underline">
//                 Mot de passe oublié ?
//               </a>
//             </div>
//           )} */}

//           <button
//             type="submit"
//             className="w-full py-2 bg-secondaryPale hover:bg-primaryBrown rounded-full text-black font-bold font-secondary transition"
//           >
//             {isSignup ? "S'inscrire" : "Se connecter"}
//           </button>
//         </form>

//         <div className="mt-4 text-sm text-black font-secondary text-center">
//           {isSignup ? (
//             <>
//               Vous avez déjà un compte ?{" "}
//               <button
//                 onClick={toggleMode}
//                 className="text-white font-secondary hover:underline"
//               >
//                 Connectez-vous !
//               </button>
//             </>
//           ) : (
//             <>
//               Pas de compte ?{" "}
//               <button
//                 onClick={toggleMode}
//                 className="text-white font-secondary hover:underline"
//               >
//                 Inscrivez-vous !
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/userAPI";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [userData, setUserData] = useState({
    user_name: "",
    user_firstname: "",
    email: "",
    birth_date: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setError(""); // Reset error message when toggling between login and signup
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification si les mots de passe correspondent en mode inscription
    if (isSignup && userData.password !== userData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      if (isSignup) {
        // Inscription
        await registerUser({
          user_name: userData.user_name,
          user_firstname: userData.user_firstname,
          email: userData.email,
          birth_date: userData.birth_date,
          password: userData.password,
        });
        navigate("/shot"); // Redirection après inscription réussie
      } else {
        // Connexion
        const response = await loginUser({
          email: userData.email,
          password: userData.password,
        });
        if (response.user) {
          navigate("/shot"); // Redirection après connexion réussie
        }
      }
    } catch (err) {
      setError("Erreur lors de l'authentification. Vérifiez vos informations :" + err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center bg-cover bg-center bg-repeat text-white"
      style={{ backgroundImage: `url('background.jpg')` }}
    >
      <div>
        <img src="/Logo.png" alt="Logo" className="h-48" />
      </div>

      <h1 className="text-9xl font-title font-bold -mt-12">Target Dummy</h1>
      <p className="mt-2 text-2xl font-secondary">Rejoignez l'expérience de tir ultime</p>

      <div
        className={`bg-primaryBrown bg-opacity-70 p-8 rounded-2xl mt-8 shadow-lg ${
          isSignup ? "w-full max-w-4xl" : "w-96"
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-black font-title mb-6">
          {isSignup ? "Inscrivez-vous" : "Se connecter"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {isSignup ? (
            <div className="grid grid-cols-2 gap-6">
              {/* Colonne de gauche */}
              <div>
                <label className="block text-sm text-black font-semibold font-secondary mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  name="user_firstname"
                  value={userData.user_firstname}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
                />
              </div>

              <div>
                <label className="block text-sm text-black font-semibold font-secondary mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={userData.user_name}
                  onChange={handleChange}
                  placeholder="Votre nom d'utilisateur"
                  className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
                />
              </div>

              <div>
                <label className="block text-sm text-black font-semibold font-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
                />
              </div>

              {/* Colonne de droite */}
              <div>
                <label className="block text-sm text-black font-semibold font-secondary mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="birth_date"
                  value={userData.birth_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
                />
              </div>

              <div>
                <label className="block text-sm text-black font-semibold font-secondary mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Votre mot de passe"
                  className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
                />
              </div>

              <div>
                <label className="block text-sm text-black font-semibold font-secondary mb-2">
                  Confirmez le mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                  className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
                />
              </div>
            </div>
          ) : (
            // Mode Connexion (Login)
            <>
              <div>
                <label className="block text-sm text-black font-semibold font-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
                />
              </div>

              <div>
                <label className="block text-sm text-black font-semibold font-secondary mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Votre mot de passe"
                  className="w-full px-4 py-2 rounded-full bg-primaryPale text-black focus:outline-none focus:ring-2 focus:ring-primaryDark"
                />
              </div>
            </>
          )}

          {error && <div className="text-red-500 text-center">{error}</div>}

          <button
            type="submit"
            className="w-full py-2 bg-secondaryPale hover:bg-primaryBrown rounded-full text-black font-bold font-secondary transition mt-6"
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

