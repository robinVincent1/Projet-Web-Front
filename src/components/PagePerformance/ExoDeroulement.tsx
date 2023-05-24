
import { motion } from "framer-motion";
import { Programme, Seance } from "../PageProgramme/RechercheProgrammeUser";

interface ExoDeroulementProps {
  prog: Programme;
  seance: Seance;
  toggleExoAffich: (progNom: string, seanceNom: string, exoNom: string, affich: boolean) => void;
}

export const ExoDeroulement = ({ prog, seance, toggleExoAffich }: ExoDeroulementProps) => {

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
    <motion.div
    variants={divVariants}
    initial="initial"
    animate="animate"
    >
      {seance.exercice.map((e) => {
        return (
          <div className="flex justify-center items-center p-2">
            <button
              onClick={() => toggleExoAffich(prog.nom, seance.nom, e.nom, !e.affich)}
              className={`border p-4 w-auto rounded shadow-xl  hover:bg-green-500 hover:text-white ${
                e.affich && "bg-black text-white hover:bg-[grey] hover:text-[white]"
              }`}
            >
              {e.nom}
            </button>
          </div>
        );
      })}
    </motion.div>
  );
};
