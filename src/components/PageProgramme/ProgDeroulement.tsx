import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { BiPencil, BiSend } from "react-icons/bi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { Exercice, Programme, Seance } from "./RechercheProgrammeUser";
import { DeleteExercice, DeleteProgramme, DeleteSeance, PutExercice, PutSeance } from "./FonctionsModif";
import { useEffect } from "react";
import Cookies from "js-cookie";

type ProgDeroulementProps = {
  prog: Programme;
};

export const ProgDeroulement = ({ prog }: ProgDeroulementProps) => {
  const divVariants = {
    initial: {
      y: -200,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const [nbGridS, setNbGridS] = useState(prog.seance.length);
  const [onModif, setOnModif] = useState(false);

  function handleClickProg() {
    const result = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce programme ?"
    );
    if (result) {
      // code à exécuter si l'utilisateur a cliqué sur OK
      if (Token) {
        DeleteProgramme(prog._id, Token)
      }
    } else {
      // code à exécuter si l'utilisateur a cliqué sur Annuler
    }
  }

  function handleClickSeance(seance: Seance) {
    const result = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette séance ?"
    );
    if (result) {
      // code à exécuter si l'utilisateur a cliqué sur OK
      if (Token) {
        DeleteSeance(seance._id, Token)
      }
    } else {
      // code à exécuter si l'utilisateur a cliqué sur Annuler
    }
  }

  function handleClickExo(exercice: Exercice) {
    const result = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet exercice ?"
    );
    if (result) {
      // code à exécuter si l'utilisateur a cliqué sur OK
      if (Token) {
        DeleteExercice(exercice._id, Token)
      }
    } else {
      // code à exécuter si l'utilisateur a cliqué sur Annuler
    }
  }

  const [NouveauNom, setNouveauNom] = useState<string>("");
  const handleNouveauNom = (event: ChangeEvent<HTMLInputElement>) => {
    setNouveauNom(event.target.value);
  };

  const [nouvelleSerie, setNouvelleSerie] = useState<[string, string][]>([]);
  const handleNouvelleSerie = (event: ChangeEvent<HTMLInputElement>) => {
    const a = event.target.value.split(",");
    const b = a.map((i) => i.split("-")) as [string, string][];
    setNouvelleSerie(b);
  };

  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    const jwtToken = Cookies.get("jwt");
    setToken(jwtToken);
  }, []);
  const Token = token;

  return (
    <motion.div
      className="text-2xl pb-32"
      variants={divVariants}
      initial="initial"
      animate="animate"
    >
      <div className="font-bold text-md sm:text-md md:text-lg lg:text-xl xl:text-xl p-4 mb-4 justify-center items-center flex">
        <div className=" p-4 border-[black] rounded-xl w-1/4 text-center justify-between flex items-center border">
          {prog.nom}
          {onModif ? (
            <div>
              <button
                className=" mr-4 text-xs sm:text-xs md:text-xs lg:text-lg xl:text-lg border p-2 ml-4 rounded-lg hover:shadow-xl"
                onClick={() => {
                  handleClickProg();
                }}
              >
                <BsFillTrash3Fill />
              </button>
              <button
                className=" mr-4 text-xs sm:text-xs md:text-xs lg:text-lg xl:text-lg border p-2 ml-4 rounded-lg hover:shadow-xl"
                onClick={() => {
                  setOnModif(false);
                }}
              >
                <BiSend />
              </button>
            </div>
          ) : (
            <button
              className="mr-4 text-xs sm:text-xs md:text-sm lg:text-lg xl:text-lg border p-2 ml-4 rounded-lg hover:shadow-xl"
              onClick={() => {
                setOnModif(true);
              }}
            >
              <BiPencil />
            </button>
          )}
        </div>
      </div>
      <div className={`grid grid-cols-${nbGridS}`}>
        {prog.seance.map((elem) => {
          const nbGridE = elem.exercice.length;
          return (
            <div className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm">
              <h2 className="p-2 flex text-white bg-gray-500 rounded-lg font-bold border mr-2 ml-2 text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm text-center justify-center">
                {onModif ? (
                  <div>
                    <input
                      className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm w-1/2 p-2 text-[black] rounded-lg"
                      placeholder={elem.nom}
                      onChange={handleNouveauNom}
                    />
                    <button
                      className="ml-2 border hover:shadow-xl p-2 rounded-lg borde-[black] text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm"
                      onClick={() => {
                        handleClickSeance(elem)
                      }}
                    >
                      <BsFillTrash3Fill />
                    </button>
                    <button
                      className="ml-2 border hover:shadow-xl p-2 rounded-lg borde-[black] text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm"
                      onClick={() => {
                        const newSeance: Seance = {
                          _id: elem._id,
                          idProgramme: elem.idProgramme,
                          nom: NouveauNom,
                          muscle: elem.muscle,
                          exercice: elem.exercice,
                          affich: elem.affich,
                        };
                        if (Token) {
                          PutSeance(newSeance, Token);
                        }
                      }}
                    >
                      <BiSend />
                    </button>
                  </div>
                ) : (
                  <div className=" p-2">{elem.nom}</div>
                )}
              </h2>
              <div >
                {elem.exercice.map((ex, index) => {
                  return (
                    <div
                      className=" p-2 text-xl sm:text-md md:text-md lg:text-lg xl:text-xl"
                      key={index}
                    >
                      {onModif ? (
                        <div>
                          <input
                            className="p- mb-2 text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm border rounded-lg border-[black] items-center text-center justify-center w-1/2"
                            type="text"
                            placeholder={ex.nom}
                            onChange={handleNouveauNom}
                          />
                          <button
                            className="ml-2 border p-2 hover:shadow-xl rounded-lg borde-[black] text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm"
                            onClick={() => {
                              handleClickExo(ex)
                            }}
                          >
                            <BsFillTrash3Fill />
                          </button>
                          <button
                            className="ml-2 border p-2 hover:shadow-xl rounded-lg borde-[black] text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm"
                            onClick={() => {
                              const newExo: Exercice = {
                                _id: ex._id,
                                nom: NouveauNom,
                                idSeance: ex.idSeance,
                                series: nouvelleSerie.length === 0 ? ex.series : nouvelleSerie,
                                performances: ex.performances,
                                affich: ex.affich,
                              };                              
                              if (Token) {
                                PutExercice(newExo, Token);
                              }
                            }}
                          >
                            <BiSend />
                          </button>
                        </div>
                      ) : (
                        <div className="p-2 font-bold text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs">{ex.nom}</div>
                      )}

                      <div>
                        {onModif ? (
                          <div className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs">
                            <input
                              className=" mt-2 mb-2  text-center font-bold text-xs sm:text-xs md:text-xs lg:text-sm xl:text-xs border border-[black] w-1/6 mr-2 ml-2 rounded-lg"
                              placeholder={"0-0,0-0,... "}
                              onChange={handleNouvelleSerie}
                            />
                          </div>
                        ) : (
                          <div className="grid grid-cols-2">
                            <div className="italic border p-2 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-xs">
                              <div className="font-bold">
                              Rep
                              </div>
                          {ex.series.map((serie) => (
                            <div className="italic border text-xs sm:text-xs md:text-xs lg:text-sm xl:text-xs">
                              {serie[0]}
                            </div>
                          ))}
                          </div>
                            <div className="italic border p-2 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-xs">
                              <div className="font-bold">
                              Kg
                              </div>
                          {ex.series.map((serie) => (
                            <div className="italic border text-xs sm:text-xs md:text-xs lg:text-sm xl:text-xs">
                              {serie[1]}
                            </div>
                          ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
