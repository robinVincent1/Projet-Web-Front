import { ChangeEvent, useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai"
import { motion } from "framer-motion";
import ButtonResetSeance from "./ButoonResetSeance";
import { ExerciceStockage, ProgStockage, SeanceStockage } from "./CreerProg";
import { useAuth } from "../auth";

export const Modifier = () => {

  const { idUser, admin } = useAuth();
const { isLoggedIn } = useAuth();

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
  const [listeSeance, setListeSeance] = useState<SeanceStockage[]>([]);
  const [NomExo, setNomExo] = useState<string>("");
  const [listeExo, setListeExo] = useState<ExerciceStockage[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [nomProg, setNomProg] = useState("");
  const [newProg, setNewProg] = useState<ProgStockage>();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleInputNomSeanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomSeance(event.target.value);
  };

  const handleInputNomProgChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomProg(event.target.value);
  }

  const handleInputNomExoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomExo(event.target.value);
  }

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

  return (
    <motion.div className=" pb-32 p-4"
    variants={divVariants}
    initial="initial"
    animate="animate"
    >
      <h1 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl p-4  border rounded-xl bg-[black] text-[white]">Modifie ton programme :</h1>
      <div className="pt-8">
        {nomProgChoisi ? (
          <motion.div
          variants={divVariants}
          initial="initial"
          animate="animate"
          >
            <div className="grid grid-cols-5 p-4">
              <form className="  col-md-5 col-sm-12 col-span-2 rounded-xl bg-[black]"
              >
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
                    onClick={() => {
                      const newListeMuscle: string[] = [
                        ...listeMuscle,
                        selectedOption,
                      ];
                      setListeMuscle(newListeMuscle);
                      console.log(listeMuscle);
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
                    <button 
                      className="bg-[white] p-2 rounded-3xl mt-4 hover:bg-[black] hover:text-[white] shadow-xl text-base sm:text-sm md:text-xl lg:text-xl xl:text-xl"
                      onClick={() => {
                        const newExo : ExerciceStockage = {
                          idSeance: "",
                          nom: NomExo,
                          series: [],
                          performances: [[]],
                          affich: false,
                        }
                        const NewListeExo : ExerciceStockage[] = [...listeExo, newExo];
                        setListeExo(NewListeExo);
                      }}
                      type="button"
                    >
                      Ajouter
                    </button>
                </div>
                <div className="p-8 flex items-center justify-center">
                  <button
                    className="border bg-[white] p-2 rounded-3xl hover:bg-[black] hover:text-[white] shadow-xl mr-4"
                    onClick={() => {
                      const newSeance: SeanceStockage = {
                        idProgramme: "",
                        nom: nomSeance,
                        muscle: listeMuscle,
                        affich: false,
                      };
                      const newListeSeance: SeanceStockage[] = [
                        ...listeSeance,
                        newSeance,
                      ];
                      setListeSeance(newListeSeance);
                      setListeMuscle([])
                      setNomSeance("")
                      setListeExo([])
                      setNbSeance(nbSeance + 1)
                    }}
                    type="button"
                  >
                    Ajouter la séance
                  </button>
                  <ButtonResetSeance listeM={setListeMuscle} listeE={setListeExo}/>
                </div>
              </form>
              <div className="flex justify-center items-center h-full">
                <div className="text-base sm:text-xl md:text-3xl lg:text-6xl xl:text-6xl text-center">
                  <AiOutlineDoubleRight />
                </div>
              </div>

              <div className="col-span-2 rounded-3xl bg-[black] ">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl text-white font-bold">Nom de la séance : {nomSeance}</h1>
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
                      return <li className="text-white mt-2 mb-4">{elem.nom}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-8">
              <button
                className="border p-4 rounded-3xl hover:bg-[black] hover:text-[white] shadow-xl text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl"
                onClick={() => {
                    const progFinal : ProgStockage = {
                        createur: idUser,
                        admin: admin,
                        nom: nomProg,
                        affich: false,
                    }
                    setNewProg(progFinal)
                    setNomProgChoisi(false)
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
                onClick={() => {
                  setNomProgChoisi(true);      
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
