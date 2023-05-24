import { useEffect, useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { SeanceDeroulement } from "./SeanceDeroulement";
import { Footer } from "../Footer/Footer";
import { ExoDeroulement } from "./ExoDeroulement";
import { motion } from "framer-motion";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Head } from "../Head/Head";
import ButtonSuppr from "./ButtonSuppr";
import ButtonSend from "./ButtonSend";
import { useAuth } from "../auth";
import Cookies from "js-cookie";
import {
  getExercice,
  getProgrammes,
  getSeance,
} from "../PageProgramme/FonctionAPI";
import { ExerciceStockage } from "../PageProgramme/CreerProg";
import {
  Exercice,
  Programme,
  RechercheProg,
  Seance,
} from "../PageProgramme/RechercheProgrammeUser";
import { PutExercice } from "../PageProgramme/FonctionsModif";

export const Performance = () => {
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
      // Recherchez le programme correspondant dans la liste de programmes précédente
      const index = prevListeProgramme.findIndex((prog) => prog.nom === nom);
      if (index === -1) {
        return prevListeProgramme;
      }

      // Créez une nouvelle liste de programmes avec la nouvelle valeur de affich pour le programme correspondant
      const updatedListeProgramme: Programme[] = prevListeProgramme.map(
        (prog) => ({
          ...prog,
          affich: prog.nom === nom,
          seance: prog.seance.map((s) => ({
            ...s,
            affich: false,
            exercice: s.exercice.map((e) => ({
              ...e,
              affich: false,
            })),
          })),
        })
      );

      return updatedListeProgramme;
    });
  };

  const toggleSeanceAffich = (progNom: string, seanceNom: string) => {
    setListeProgramme((prevListeProgramme) => {
      // Rechercher le programme correspondant dans la liste de programmes précédente
      const progIndex = prevListeProgramme.findIndex(
        (prog) => prog.nom === progNom
      );
      if (progIndex === -1) {
        return prevListeProgramme;
      }

      // Rechercher la séance correspondante dans le programme
      const seanceIndex = prevListeProgramme[progIndex].seance.findIndex(
        (s) => s.nom === seanceNom
      );
      if (seanceIndex === -1) {
        return prevListeProgramme;
      }

      // Créer une nouvelle liste de programmes avec la nouvelle valeur de affich pour la séance correspondante
      const updatedListeProgramme: Programme[] = prevListeProgramme.map(
        (prog) => {
          if (prog.nom !== progNom) {
            return {
              ...prog,
              seance: prog.seance.map((s) => ({
                ...s,
                affich: false,
                exo: Array.isArray(s.exercice)
                  ? (s.exercice.map((e) => ({
                      ...(typeof e === "string" ? { nom: e } : e),
                      affich: false,
                    })) as (Exercice | string)[])
                  : [],
              })),
            };
          }
          const updatedSeance = prog.seance.map((s) => {
            const updatedExo = s.exercice.map((e) => ({
              ...(typeof e === "string" ? { nom: e } : e),
              affich: s.nom === seanceNom && (e as Exercice).affich === true,
            })) as (Exercice | string)[];
            return {
              ...s,
              affich: s.nom === seanceNom,
              exexercice: updatedExo,
            };
          });
          return { ...prog, seance: updatedSeance };
        }
      );

      return updatedListeProgramme;
    });
  };

  const toggleExoAffich = (
    progNom: string,
    seanceNom: string,
    exoNom: string
  ) => {
    setListeProgramme((prevListeProgramme) => {
      // Rechercher le programme correspondant dans la liste de programmes précédente
      const progIndex = prevListeProgramme.findIndex(
        (prog) => prog.nom === progNom
      );
      if (progIndex === -1) {
        return prevListeProgramme;
      }

      // Rechercher la séance correspondante dans le programme
      const seanceIndex = prevListeProgramme[progIndex].seance.findIndex(
        (s) => s.nom === seanceNom
      );
      if (seanceIndex === -1) {
        return prevListeProgramme;
      }

      // Créer une nouvelle liste de programmes avec la nouvelle valeur de affich pour l'exercice correspondant
      const updatedListeProgramme = prevListeProgramme.map((prog) => {
        if (prog.nom !== progNom) {
          return prog;
        }
        const updatedSeance = prog.seance.map((s) => {
          if (s.nom !== seanceNom) {
            return s;
          }
          const updatedExo = s.exercice.map((e) => {
            if (e.nom !== exoNom) {
              return { ...e, affich: false };
            }
            return { ...e, affich: !e.affich };
          });
          return { ...s, exercice: updatedExo };
        });
        return { ...prog, seance: updatedSeance };
      });

      return updatedListeProgramme;
    });
  };

  const [listePerf, setListePerf] = useState<[string, string][]>([]);
  const [nbRep, setNbRep] = useState("");
  const [poids, setPoids] = useState("");

  const [affichPerf, setAffichPerf] = useState<[string, [string, string][]][]>(
    []
  );
  const [exoEnCours, setExoEnCours] = useState<string>("");

  const handleDelete = (index: number) => {
    const updatedList = [...affichPerf];
    updatedList.splice(index, 1);
    setAffichPerf(updatedList);
  };

  const [serieAjoutee, setSerieAjoutee] = useState(false);

  return (
    <div className="">
      <Head />
      <div className="rounded-3xl min-h-screen">
        <div>
          <div className=" text-center justify-center p-8 ">
            <div>
              <h1 className="font-bold text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl p-4 ">
                Performance
              </h1>
            </div>
            <div>
              <p className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm">
                Bienvenue sur la page de performance ! Ici, vous pouvez rentrer
                les résultats de vos séances sportives pour suivre votre
                progression au fil du temps. Utilisez les champs prévus à cet
                effet pour enregistrer vos performances et consultez vos
                statistiques pour mieux vous connaître et atteindre vos
                objectifs sportifs.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 p-8 ">
            <div className=" justify-center text-center flex grid grid-cols-3 text-xs sm:text-sm md:text-xl lg:text-xl xl:text-2xl font-bold text-left">
              <div className="col-span-2 ">
                {listeProgramme.map((elem) => (
                  <div className="p-2">
                    <button
                      onClick={() => {
                        toggleAffich(elem.nom);
                      }}
                      className={`border p-4 w-auto rounded shadow-xl mr-8 mt-2 ml-8 hover:bg-green-500 hover:text-white ${
                        elem.affich &&
                        "bg-black text-white hover:bg-[grey] hover:text-[white]"
                      }`}
                    >
                      {elem.nom}
                    </button>
                  </div>
                ))}
              </div>
              {listeProgramme.map((p) => {
                return (
                  p.affich && (
                    <div className=" flex justify-center items-center text-xs sm:text-sm md:text-xl lg:text-xl xl:text-2xl">
                      <AiOutlineDoubleRight />
                    </div>
                  )
                );
              })}
            </div>

            <div className=" grid grid-cols-3">
              <div className=" col-span-2 justify-center items-center flex text-xs sm:text-sm md:text-xl lg:text-xl xl:text-2xl font-bold ">
                {listeProgramme.map(
                  (elem) =>
                    elem.affich && (
                      <SeanceDeroulement
                        prog={elem}
                        toggleSeanceAffich={toggleSeanceAffich}
                        toggleExoAffich={toggleExoAffich}
                      />
                    )
                )}
              </div>
              {listeProgramme.map((p) => {
                return p.seance.map((s) => {
                  return (
                    s.affich && (
                      <div className="flex justify-center items-center text-xs sm:text-sm md:text-xl lg:text-xl xl:text-2xl">
                        <AiOutlineDoubleRight />
                      </div>
                    )
                  );
                });
              })}
            </div>

            <div className=" justify-center items-center flex text-xs sm:text-sm md:text-xl lg:text-xl xl:text-2xl font-bold ">
              {listeProgramme.map((p) =>
                p.seance.map((s) => {
                  return (
                    s.affich && (
                      <ExoDeroulement
                        toggleExoAffich={toggleExoAffich}
                        prog={p}
                        seance={s}
                      />
                    )
                  );
                })
              )}
            </div>
          </div>
          <div className="items-center justify-center text-center flex ">
            {listeProgramme.map((p) => {
              return p.seance.map((s) => {
                return s.exercice.map((e) => {
                  return (
                    (e as Exercice).affich && (
                      <motion.div
                        className="items-center justify-center flex text-center mb-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 1.5 } }}
                      >
                        <form className=" p-8 rounded-3xl shadow-xl border ">
                          <label className="p-4 text-xs sm:text-md lg:text-lg xl:text-xl">
                            Saisis ta performance :
                          </label>
                          <div>
                            <input
                              onChange={(event) => {
                                setNbRep(event.target.value);
                              }}
                              required={true}
                              placeholder="Nombre de répétitions"
                              type="text"
                              className="border rounded-3xl p-2 hover:border-[black] text-xs sm:text-xs lg:text-lg xl:text-xl mt-4 mb-4"
                            />
                          </div>
                          <div>
                            <input
                              onChange={(event) => {
                                setPoids(event.target.value);
                              }}
                              required={true}
                              placeholder="Poids en Kg"
                              type="text"
                              className="border rounded-3xl p-2 hover:border-[black] text-xs sm:text-xs lg:text-lg xl:text-xl"
                            />
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                const newSeries: [string, string][] = [
                                  ...listePerf,
                                  [nbRep, poids],
                                ];
                                setListePerf(newSeries);
                                listeProgramme.map((p) => {
                                  return p.seance.map((s) => {
                                    return s.exercice.map((e) => {
                                      if (e.affich) {
                                        setExoEnCours(e.nom);
                                        const newExo: Exercice = {
                                          _id: e._id,
                                          idSeance: e.idSeance,
                                          nom: e.nom,
                                          series: e.series,
                                          performances: listePerf,
                                          affich: false,
                                        };
                                        if (Token) {
                                          PutExercice(newExo, Token);
                                        }
                                      }
                                    });
                                  });
                                });

                                setSerieAjoutee(true);

                                // Cacher "Série ajoutée" après 3 secondes
                                setTimeout(() => {
                                  setSerieAjoutee(false);
                                }, 1500);
                              }}
                              className="bg-[white] pr-4 pl-4 pt-2 pb-2 mt-4 border rounded shadow hover:shadow-2xl text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl"
                              type="button"
                            >
                              Ajouter
                            </button>
                            {serieAjoutee && (
                              <div className="text-lg mt-2 sm:text-lg md:text-lg lg:text-lg xl:text-lg text-[green] justify-center text-center flex">
                                <IoMdCheckmarkCircleOutline />
                              </div>
                            )}
                          </div>
                        </form>

                        <div className="ml-4">
                          <ButtonSend
                            exoEC={exoEnCours}
                            listeP={listePerf}
                            setAffP={setAffichPerf}
                            setListeP={setListePerf}
                            affP={affichPerf}
                          />
                        </div>
                      </motion.div>
                    )
                  );
                });
              });
            })}
          </div>
          <div>
            <div className="grid grid-cols-2 mb-16">
              <div className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl p-4 items-center justify-center flex bg-gray-500 text-[white] ">
                Séance d'aujourd'hui
              </div>
              <div className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl p-4 items-center justify-center flex bg-gray-500 text-[white] ">
                Séance précédente
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="p-8 mb-16 ">
                {affichPerf.map((s) => {
                  return (
                    <motion.div
                      className=" grid grid-cols-4 text-xs sm:text-xs md:text-xl lg:text-xl xl:text-xl p-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 1.5 } }}
                    >
                      <div className="border text-center col-span-2 items-center justify-center flex p-2 ml-8 rounded-3xl shadow-xl ">
                        {s[0]}
                      </div>
                      <div className="border p-2 ml-8 rounded-3xl shadow-xl">
                        {s[1].map((p) => {
                          return (
                            <div className="text-center ">
                              {p[0]} rep -- {p[1]}Kg
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="p-2 mb-16 ">
                {listeProgramme.map((p) => {
                  if (p.affich) {
                    return p.seance.map((s) => {
                      if (s.affich) {
                        return s.exercice.map((e) => {
                            return (
                              <motion.div
                                className="grid grid-cols-4 text-xs sm:text-xs md:text-xl lg:text-xl xl:text-xl p-2"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: 1,
                                  transition: { duration: 1.5 },
                                }}
                              >
                                <div className="border text-center col-span-2 items-center justify-center flex p-2 ml-8 rounded-3xl shadow-xl ">
                                  {e.nom}
                                </div>
                                <div className="border p-2 ml-8 rounded-3xl shadow-xl">
                                  {e.performances.map((perf) => {
                                    return (
                                      <div className="text-center ">
                                        {perf[0]} rep à {perf[1]}Kg
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            );
                          return null;
                        });
                      }
                      return null;
                    });
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
