import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getProgrammes, getExercice, getSeance } from "./FonctionAPI";
import { useAuth } from "../auth";

export type Programme = {
  _id: string;
  createur: string;
  admin: boolean;
  nom: string;
  affich: boolean;
  seance: Seance[];
};

export type Seance = {
  _id : string;
  idProgramme: string;
  nom: string;
  muscle: string[];
  affich: boolean;
  exercice: Exercice[];
};

export type Exercice = {
  _id: string;
  idSeance: string;
  nom: string;
  series: [string, string][];
  performances: [string, string][];
  affich: boolean;
};

export const RechercheProg = () => {

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
  return listeProgramme;
};