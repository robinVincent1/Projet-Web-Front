import { useState } from "react";
import { Footer } from "../Footer/Footer";
import { Head } from "../Head/Head";
import Identifiant from "./Identifiant";
import { useAuth } from "../auth";

export const Contact = () => {

  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();


  return (
    <div className="">
        <Head />
        <div className="min-h-screen">
        <div className="text-center justify-center p-8">
            <h1 className="font-bold text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl p-4 ">
                Contact
            </h1>
            <p className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm">
            Bienvenue sur la page de contact ! Si vous avez des questions ou des commentaires, 
            n'hésitez pas à nous les envoyer via le formulaire ci-dessous. Nous serons ravis de vous aider !
            </p>
        </div>
      <div className="items-center text-center justify-center flex h-1/2 p-8">
        <Identifiant onObject={setObject} onMessage={setMessage} />
      </div>
      </div>
      <Footer />
    </div>
  );
};
