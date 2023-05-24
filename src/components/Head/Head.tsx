import { useState, useEffect } from "react";
import Link from "./Link";
import LinkR from "./LinkR";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useAuth } from "../auth";

interface DecodedToken extends JwtPayload {
  sub: string;
  email: string;
  exp: number;
}

export const Head = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt_decode<DecodedToken>(token);
      if (decodedToken.exp < Date.now() / 1000) {
        // Si le token est expiré, informer l'utilisateur et le déconnecter
        window.alert("Votre session a expiré, veuillez vous reconnecter.");
        localStorage.removeItem("token");
        window.location.reload();
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <div className="">
     

      <div className="grid grid-cols-3 bg-gradient-to-r from-green-500 via-gray-500 to-black ">
        <div className="">
          <Link />
        </div>
        <div className=""></div>
        <div className="items-center justify-center text-center flex">
          <LinkR/>
        </div>
      </div>
    </div>
  );
};
