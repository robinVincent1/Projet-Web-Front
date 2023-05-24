import { Head } from "../Head/Head";
import ButtonConnexion from "./ButtonConnexion";
import { Footer } from "../Footer/Footer";
import "../../styles/App.css"
import { Avis } from "./Avis";
import { useAuth } from "../auth";
import LinkR from "../Head/LinkR";
import TextButtons from "../Head/Link";

export const PageAccueil = () => {

  const {isLoggedIn} = useAuth();

  return (
    <div className="">
      <div 
      className="h-screen items-center justify-center flex-col text-center text-[white] " 
      style={{
        backgroundImage: `url("/Images/ImageAccueil.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      >
        <div className="flex justify-between shadow-xl font-bold ">
        <TextButtons />
        <LinkR />
        </div>
        <div className=" text-center justify-center p-16 items-center">
          <h1 className="font-bold text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl p-4 text-center justify-center items-center flex">
            Bienvenue !
          </h1>
          <p className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm ">
            Bienvenue sur ProgramBuilder, l'outil idéal pour les amateurs
            de sport qui souhaitent suivre leur évolution dans le temps. Grâce à
            notre plateforme, vous pouvez créer votre propre programme sportif
            et y enregistrer vos performances pour suivre vos progrès. Que vous
            soyez débutant ou confirmé, ProgramBuilder est la solution
            adaptée pour atteindre vos objectifs sportifs en toute simplicité.
            Suivez votre progression, restez motivé et atteignez vos objectifs
            grâce à notre outil performant et convivial. Rejoignez dès
            maintenant notre communauté de sportifs passionnés !
          </p>
        </div>
        <div className="justify-center p-4 mb-32">
        {isLoggedIn ? <div></div> : 
        <div>
          <h2 className="font-bold text-sm sm:text-sm md:text-sm lg:text-md xl:text-lg p-4">
            Connectez-vous ou inscrivez-vous pour profiter des fonctionnalités
            du site !
          </h2>
          <div className="text-center justify-center flex">
            <ButtonConnexion />
          </div>
        </div>
        }
        </div>
        <div className="mt-32 text-black">
      <Avis />
    </div>
      </div>
    <Footer />
    </div>
  );
};
