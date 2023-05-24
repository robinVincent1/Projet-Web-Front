import { ChangeEvent, useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { motion } from "framer-motion";
import ButtonResetSeance from "./ButoonResetSeance";
import Cookies from "js-cookie";
import { addExercices, addSeance, AddProgramme } from "./FonctionAPI";
import { useAuth } from "../auth";
import { useEffect } from "react";

export type SeanceStockage = {
  idProgramme: string;
  nom: string;
  muscle: string[];
  affich: boolean;
};

export type ProgStockage = {
  createur: string;
  admin: boolean;
  nom: string;
  affich: boolean;
};

export type ExerciceStockage = {
  idSeance: string;
  nom: string;
  series: string[][];
  performances: string[][];
  affich: boolean;
};

export const CreerProg = () => {
  
  const numSeance = [
    "première",
    "deuxième",
    "troisième",
    "quatrième",
    "cinquième",
    "sixième",
    "septième",
  ];

  const [nbSeance, setNbSeance] = useState(0);
  const [nomProgChoisi, setNomProgChoisi] = useState(false);
  const [nomSeance, setNomSeance] = useState("");
  const [listeMuscle, setListeMuscle] = useState<string[]>([]);
  const [NomExo, setNomExo] = useState<string>("");
  const [listeExo, setListeExo] = useState<ExerciceStockage[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [nomProg, setNomProg] = useState("");
  const [serie, setSerie] = useState("");
  const [ListeSerie, setListeSerie] = useState<[string, string][]>([]);
  const [idP, setIDP] = useState<string>("");
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(idP);
  }, [idP]);

  useEffect(() => {
    const jwtToken = Cookies.get("jwt");
    setToken(jwtToken);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleInputNomSeanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomSeance(event.target.value);
  };

  const handleInputNomProgChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomProg(event.target.value);
  };

  const handleInputNomExoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomExo(event.target.value);
  };

  const handleInputSerie = (event: ChangeEvent<HTMLInputElement>) => {
    setSerie(event.target.value);
  };

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

  const { idUser } = useAuth();
  const adminString = Cookies.get("admin");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (adminString === "true") {
      setAdmin(true)
    }
    else {
     setAdmin(false);
    }
    console.log(admin)
  }, [adminString, admin])
  
  const Token = token;

  return (
    <motion.div
      className=" pb-32 p-4"
      variants={divVariants}
      initial="initial"
      animate="animate"
    >
      <h1 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl p-4  border rounded-xl bg-[black] text-[white]">
        Création de ton programme :
      </h1>
      <div className="pt-8">
        {nomProgChoisi ? (
          <motion.div
            variants={divVariants}
            initial="initial"
            animate="animate"
          >
            <div className="grid grid-cols-5 p-4">
              <form className="  col-md-5 col-sm-12 col-span-2 rounded-xl bg-[black]">
                <div className="p-4">
                  <input
                    onChange={handleInputNomSeanceChange}
                    className="border rounded-3xl w-1/2 p-4 hover:border-[black] text-xs sm:text-sm md:text-sm lg:text-lg xl:text-lg"
                    type="text"
                    placeholder={
                      "Quelle est ta " + numSeance[nbSeance] + " séance ?"
                    }
                    required={true}
                  />
                </div>
                <div className="p-2">
                  <label className="p-4 text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-white">
                    Choisis les muscles concernés :
                  </label>

                  <select
                    name="muscle"
                    id="muscle"
                    className="hover:bg-[white] hover:text-[black] text-white bg-[black] mt-4 p-4 mr-4 text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl"
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    <option value="Pectauraux">Pectoraux</option>
                    <option value="Deltoides">Deltoide</option>
                    <option value="Dos">Dos</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Lombaires">Lombaires</option>
                    <option value="Abdominaux">Abdominaux</option>
                    <option value="Fessiers">Fessiers</option>
                    <option value="Ischio-jambiers">Iscio-jambiers</option>
                    <option value="Quadriceps">Quadriceps</option>
                    <option value="Mollets">Mollets</option>
                  </select>
                  <button
                    className="bg-[black] p-2 mt-4 rounded-xl hover:bg-[white] hover:text-[black] text-white  shadow-xl text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl"
                    onClick={async () => {
                      if (selectedOption) {
                        const newListeMuscle: string[] = [
                          ...listeMuscle,
                          selectedOption,
                        ];
                        setListeMuscle(newListeMuscle);
                        console.log(listeMuscle);
                      }
                    }}
                    type="button"
                  >
                    Ajouter
                  </button>
                </div>
                <div>
                  <label className="p-2 text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-white">
                    Choisis les exercices de ta séance :
                  </label>
                  <input
                    required={true}
                    type="text"
                    placeholder="Exercice"
                    className="border rounded-xl w-1/2 p-2 mt-2 mr-2 hover:border-[black] text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl"
                    onChange={handleInputNomExoChange}
                  />
                </div>
                <div className="p-2">
                  <label className="p-2 text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-white">
                    Ajoute une serie (ex: "8 rep 100kg") :
                  </label>
                  <input
                    required={true}
                    type="text"
                    placeholder="Serie"
                    className="border rounded-xl w-1/2 p-2 mt-2 mr-2 hover:border-[black] text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl"
                    onChange={handleInputSerie}
                  />
                  <button
                    className="bg-[white] p-2 rounded-3xl mt-4 hover:bg-[black] hover:text-[white] shadow-xl text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl"
                    onClick={async () => {
                      if (serie) {
                        const [nbRepSerie, poidsSerie] = serie.split("-");
                        const newSerie: [string, string] = [
                          nbRepSerie,
                          poidsSerie,
                        ];

                        const newListeSerie: [string, string][] = [
                          ...ListeSerie,
                          newSerie,
                        ];
                        setListeSerie(newListeSerie);
                      }
                    }}
                    type="button"
                  >
                    Ajouter
                  </button>
                </div>
                <div>
                  <button
                    className="bg-[white] p-2 rounded-3xl mt-4 hover:bg-[black] hover:text-[white] shadow-xl text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl"
                    onClick={async () => {
                      const newExo: ExerciceStockage = {
                        idSeance: "",
                        nom: NomExo,
                        series: ListeSerie,
                        performances: [],
                        affich: false,
                      };
                      const NewListeExo: ExerciceStockage[] = [
                        ...listeExo,
                        newExo,
                      ];
                      setListeExo(NewListeExo);
                      setListeSerie([]);
                    }}
                    type="button"
                  >
                    Ajouter l'exercice
                  </button>
                </div>
                <div className="p-8 flex items-center justify-center">
                  <button
                    className="border bg-[white] p-2 rounded-3xl hover:bg-[black] hover:text-[white] shadow-xl mr-4"
                    onClick={async () => {
                      const newSeance: SeanceStockage = {
                        idProgramme: idP,
                        nom: nomSeance,
                        muscle: listeMuscle,
                        affich: false,
                      };
                      if (Token) {
                        try {
                          const i = await addSeance(newSeance, Token);
                          console.log(i);
                          const updatedListeExo = listeExo.map((e) => {
                            return { ...e, idSeance: i }; // Utilisez directement la valeur de `i` pour définir idSeance.
                          });
                          console.log(updatedListeExo);
                          await addExercices(updatedListeExo, Token);
                          setListeMuscle([]);
                          setNomSeance("");
                          setListeExo([]);
                          setNbSeance(nbSeance + 1);
                        } catch (error) {
                          console.log(error);
                        }
                      } else {
                        console.log("Token non trouvé");
                      }
                    }}
                    type="button"
                  >
                    Ajouter la séance
                  </button>

                  <ButtonResetSeance
                    listeM={setListeMuscle}
                    listeE={setListeExo}
                  />
                </div>
              </form>
              <div className="flex justify-center items-center h-full">
                <div className="text-base sm:text-xl md:text-3xl lg:text-6xl xl:text-6xl text-center">
                  <AiOutlineDoubleRight />
                </div>
              </div>

              <div className="col-span-2 rounded-3xl bg-[black] ">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl text-white font-bold">
                  Nom de la séance : {nomSeance}
                </h1>
                <div className="grid grid-cols-2">
                  <ul className="text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-center ml-4 mt-4">
                    <label className="font-bold border rounded-3xl p-2 text-white">
                      Muscle :
                    </label>
                    {listeMuscle.map((elem) => {
                      return <li className="mb-4 text-white mt-2">{elem}</li>;
                    })}
                  </ul>

                  <ul className="text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl text-center mt-4">
                    <label className="font-bold border rounded-3xl p-2 text-white">
                      Exercice :
                    </label>
                    {listeExo.map((elem) => {
                      return (
                        <li className="text-white mt-2 mb-4">
                          {elem.nom}
                          {elem.series.map((s) => {
                            return (
                              <div>
                                {s[0]} rep -- {s[1]} kg
                              </div>
                            );
                          })}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-8">
              <button
                className="border p-4 rounded-3xl hover:bg-[black] hover:text-[white] shadow-xl text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl"
                onClick={() => {
                  setNomProgChoisi(false);
                  setNbSeance(0);
                }}
                type="button"
              >
                Terminé
              </button>
            </div>
          </motion.div>
        ) : (
          <form className="p-4">
            <div className="pb-8">
              <input
                className="border rounded-3xl w-1/4 p-4 hover:border-[black] text-xs sm:text-xs md:text-sm lg:text-lg xl:text-lg"
                type="text"
                placeholder={"Quel est le nom de ton programme ?"}
                required={true}
                onChange={handleInputNomProgChange}
              />
            </div>

            <div className="p-4">
              <button
                className="border p-4 rounded-3xl hover:bg-[black] hover:text-[white] shadow-xl text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl"
                onClick={async () => {
                  setNomProgChoisi(true);
                  const newProg: ProgStockage = {
                    createur: idUser,
                    admin: admin,
                    nom: nomProg,
                    affich: false,
                  };
                  if (Token) {
                    console.log(idUser);
                    console.log(newProg)
                    const i = await AddProgramme(newProg, Token);
                    setIDP(i);
                  } else {
                    console.log("Token non trouvé");
                  }
                }}
                type="button"
              >
                Envoyer
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};
