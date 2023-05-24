import React, { useState } from "react";
import "../../styles/App.css";
import { Login } from "./Login/Login";
import { SignIn } from "./Sign in/SignIn";
import { Head } from "../Head/Head";
import { Footer } from "../Footer/Footer";
import { useAuth } from "../auth";
import Cookies from "js-cookie";

export const PageConnexion = () => {
  const [isConnexion, setIsConnexion] = useState(true);
  const handleIsConnexion = () => {
    setIsConnexion(!isConnexion);
  };

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const deconnexion = () => {
    setIsLoggedIn(false);
    Cookies.remove("jwt");
    Cookies.remove("tokenExpiryTime");
    Cookies.remove("idUser");
    Cookies.remove("admin")
  }

  return (
    <div className="">
      <Head />
      <div className="h-screen">
      <div className="text-center justify-center p-8 ">
            <h1 className="font-bold text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl p-4 ">
              Connexion / Inscription
            </h1>
            <p className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm">
              Bienvenue sur la page de connexion ! Ici, vous pouvez vous
              connecter ou vous inscrire pour profiter de toutes les
              fonctionnalités de notre site. Si vous êtes déjà membre, veuillez
              vous connecter en utilisant vos identifiants. Si vous êtes
              nouveau, vous pouvez vous inscrire en quelques étapes simples pour
              commencer à utiliser notre site dès maintenant.
            </p>
          </div>
      {isLoggedIn ? (
        <div className="  items-center justify-center flex">
          <button 
          className="p-4 border shadow hover:shadow-xl text-[black] bg-[white] hover:text-[white] hover:bg-[black] "
          onClick={deconnexion}
          >
            deconnexion
          </button>
      </div>
      ) : (
        <div>
          <div className="h-1/2 items-center justify-center flex pb-64">
            {isConnexion ? (
              <Login onConnexion={handleIsConnexion} />
            ) : (
              <SignIn onSignUp={handleIsConnexion} />
            )}
          </div>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};
