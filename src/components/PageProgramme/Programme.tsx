import { useEffect, useState } from "react";
import { ProgDeroulement } from "./ProgDeroulement";
import { CreerProg, ProgStockage } from "./CreerProg";
import { AiOutlinePlus } from "react-icons/ai";
import { Footer } from "../Footer/Footer";
import { Head } from "../Head/Head";
import { useAuth } from "../auth";
import { getExercice, getProgrammes, getSeance } from "./FonctionAPI";
import Cookies from "js-cookie";
import { Programme, RechercheProg } from "./RechercheProgrammeUser"


export const ProgrammePage = () => {
  const [CreerVisible, setCreerVisible] = useState(false);

  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    const jwtToken = Cookies.get("jwt");
    setToken(jwtToken);
  }, []);
  const Token = token;

  const [listeProgramme, setListeProgramme] = useState<Programme[]>([]);
  const { idUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const Token = Cookies.get("jwt");
      if (Token) {
        try {
          console.log(idUser);
          const ProgJson = await getProgrammes(idUser, Token);
          const newProgrammes = [];

          for (const i of ProgJson) {
            const sJson = await getSeance(i._id, Token);
            const newSeances = [];

            for (const k of sJson) {
              const exoJson = await getExercice(k._id, Token);
              const newExercices = exoJson.map((e: any) => {
                return {
                  _id: e._id,
                  idSeance: k._id,
                  nom: e.nom,
                  series: e.series,
                  performances: e.performances,
                  affich: e.affich,
                };
              });
              newSeances.push({
                _id: k._id,
                idProgramme: i._id,
                nom: k.nom,
                muscle: k.muscle,
                affich: k.affich,
                exercice: newExercices,
              });
            }
            newProgrammes.push({
              _id: i._id,
              createur: i.createur,
              admin: i.admin,
              nom: i.nom,
              affich: i.affich,
              seance: newSeances,
            });
          }

          setListeProgramme(newProgrammes);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("erreur d'authentification");
      }
    };

    fetchData();
  }, [Token, idUser]);




  const toggleAffich = (nom: String) => {
    setListeProgramme((prevListeProgramme) => {
      // recherchez le programme correspondant dans la liste de programmes précédente
      const index = prevListeProgramme.findIndex((prog) => prog.nom === nom);
      if (index === -1) {
        return prevListeProgramme;
      }

      // créez une nouvelle liste de programmes avec la nouvelle valeur de affich pour le programme correspondant
      const updatedListeProgramme = prevListeProgramme.map((prog, i) => ({
        ...prog,
        affich: i === index ? true : false,
      }));

      return updatedListeProgramme;
    });
  };

  const ChangeAff = () => {
    const updatedListeProgramme = listeProgramme.map((elem) => {
      return { ...elem, affich: false };
    });

    setListeProgramme(updatedListeProgramme);
    setCreerVisible(!CreerVisible);
  };


  return (
    <div className=" flex flex-col">
      <Head />
      <div className="min-h-screen relative">
        <div className=" rounded-3xl">
          <div>
            <div
              className=" text-center justify-center p-8 "
            >
              <div>
              <h1 className="font-bold text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl p-4">
                Tes programmes
              </h1>
              </div>
              <div>
              <p className=" text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm">
              Bienvenue sur la page des programmes ! Ici, vous pouvez visualiser tous vos programmes sportifs enregistrés et en créer de nouveaux en fonction de vos objectifs. 
              Prenez le temps d'explorer toutes les fonctionnalités et de découvrir comment ce site peut vous aider à atteindre vos objectifs. 
              N'hésitez pas à commencer dès maintenant en créant votre premier programme sportif !
              </p>
              </div>
            </div>
            <div className="">
              <div className="text-3xl font-bold font-serif text-center p-8 pb-32">
                {listeProgramme.map((elem) => (
                  <button
                    onClick={() => {
                      toggleAffich(elem.nom);
                      setCreerVisible(false);
                    }}
                    className={`border text-xs sm:text-xs md:text-xs lg:text-lg xl:text-lg p-4 w-auto rounded shadow-xl mr-8 mt-2 ml-8 hover:bg-black hover:text-white ${
                      elem.affich &&
                      "bg-black text-white hover:bg-[grey] hover:text-[white]"
                    }`}
                    type="button"
                  >
                    {elem.nom}
                  </button>
                ))}
                <button
                  onClick={() => ChangeAff()}
                  className="border p-4 hover:bg-[black] hover:text-[white] mt-2 rounded shadow-xl mr-8 ml-8"
                  type="button"
                >
                  <AiOutlinePlus />
                </button>
              </div>
              <div className="text-center ">
                {listeProgramme.map((elem) => {
                  if (elem.affich) {
                    return <ProgDeroulement prog={elem} />;
                  }
                })}
                {CreerVisible && <CreerProg />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
