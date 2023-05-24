import { useState } from "react";
import { motion } from "framer-motion";
import { Programme } from "../PageProgramme/RechercheProgrammeUser";

interface SeanceDeroulementProps {
  prog: Programme;
  toggleSeanceAffich: (progNom: string, seanceNom: string, affich: boolean) => void;
  toggleExoAffich: (progNom: string, seanceNom: string, ExoNom: string, affich: boolean) => void;
}

export const SeanceDeroulement = ({ prog, toggleSeanceAffich, toggleExoAffich }: SeanceDeroulementProps) => {

  const divVariants = {
    initial: {
      x: -200,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div className=""
    variants={divVariants}
    initial="initial"
    animate="animate"
    >
      {prog.seance.map((elem) => {
        return (
          <div className="flex justify-center items-center p-2 " key={elem.nom}>
            <button
              onClick={() => {
                toggleSeanceAffich(prog.nom, elem.nom, elem.affich);
              }}
              className={`border p-4 w-auto rounded shadow-xl hover:bg-green-500 hover:text-white ${
                elem.affich && "bg-black text-white hover:bg-[grey] hover:text-[white]"
              }`}
            >
              {elem.nom}
            </button>
          </div>
        );
      })}
    </motion.div>
  );
};
