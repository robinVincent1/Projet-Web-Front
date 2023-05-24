import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  AddProgramme,
  addSeance,
  createExercice,
  getExercice,
  getProgrammesAdmin,
  getSeance,
} from "../../PageProgramme/FonctionAPI";
import {
  ExerciceStockage,
  ProgStockage,
  SeanceStockage,
} from "../../PageProgramme/CreerProg";
import { useAuth } from "../../auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Props = {
  onButton: () => void;
  Identifiant: string;
  mdp: string;
  confirmMdp: string;
};

export default function ButtonSignInS({
  Identifiant,
  mdp,
  confirmMdp,
  onButton,
}: Props) {
  const navigate = useNavigate();
  const { setIdUser, setIsLoggedIn, setAdmin } = useAuth();

  const authenticate = async (Identifiant: string, MotDePasse: string) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/authentification/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Identifiant, MotDePasse }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Stocker le jeton dans un cookie nommé "token"
        if (data.Token) {
          document.cookie = `jwt=${data.Token}; path=/; max-age=3600`;
          document.cookie = `tokenExpiryTime=${
            Date.now() + 3600 * 1000
          }; path=/; max-age=3600`;
          document.cookie = `idUser=${data.id}; path=/; max-age=3600`;
          document.cookie = `admin=${data.admin}; path=/; max-age=3600`;
        }
        setIdUser(data.id);
        setIsLoggedIn(true);
        setAdmin(data.admin);
        navigate("/Accueil");
        return {
          Token: data.Token,
          idUser: data.id,
          admin: data.admin,
        };
        // Effectuer des actions en fonction de l'authentification réussie
      } else {
        console.log(data.message);
        return null;
        // Afficher un message d'erreur en cas d'authentification échouée
      }
    } catch (error) {
      console.log(error);
      // Gérer l'erreur ici
    }
  };

  const { admin, idUser } = useAuth();
  const [Token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const jwtToken = Cookies.get("jwt");
    setToken(jwtToken);
  }, []);

  const creerProgAdmin = async (idUser: string, Token: string) => {
    const prog = await getProgrammesAdmin(Token);
    console.log("Programmes Admin:", prog);
    for (const p of prog) {
      const newProg: ProgStockage = {
        createur: idUser,
        admin: admin,
        nom: p.nom,
        affich: p.affich,
      };
      const newIdProg = await AddProgramme(newProg, Token);
      const seance = await getSeance(p._id, Token);
      console.log("Séances:", seance);
      for (const s of seance) {
        const newSeance: SeanceStockage = {
          idProgramme: newIdProg,
          nom: s.nom,
          muscle: s.muscle,
          affich: s.affich,
        };
        const newIdSeance = await addSeance(newSeance, Token);
        const exo = await getExercice(s._id, Token);
        for (const e of exo) {
          const newExo: ExerciceStockage = {
            idSeance: newIdSeance,
            nom: e.nom,
            series: e.series,
            performances: [],
            affich: e.affich,
          };
          await createExercice(newExo, Token);
        }
      }
    }
  };

  const [inscriptionOK, setInscriptionOk] = React.useState(true);
  const [mauvaisMdp, setMauvaisMdp] = React.useState(false);

  const createUser = async (Identifiant: string, mdp: string) => {
    const user = {
      Identifiant: Identifiant,
      MotDePasse: mdp,
      admin: false,
    };
    try {
      const response = await fetch(`http://localhost:3001/api/utilisateurs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setInscriptionOk(false);
        }
        throw new Error(
          `Erreur lors de la création de l'utilisateur: ${response.status}`
        );
      }

      console.log(data);
      return true;
    } catch (error) {
      console.error(error);
      setInscriptionOk(false);
      return false;
    }
  };

  const [isProgCreated, setIsProgCreated] = useState(false);

  useEffect(() => {
    if (Token && idUser && !isProgCreated) {
      setIsProgCreated(true);
    }
  }, [Token, idUser]);

  const handleButtonClick = () => {
    if (mdp === confirmMdp) {
      setMauvaisMdp(false);
      createUser(Identifiant, mdp).then((result) => {
        if (!result) {
          setInscriptionOk(false);
        } else {
          setInscriptionOk(true);
          console.log("Avant l'authentification"); // Ajouter cette ligne
          authenticate(Identifiant, mdp).then((result) => {
            if (result) {
              const { Token, idUser } = result;
              creerProgAdmin(idUser, Token);
            }
          });
          onButton();
        }
      });
    } else {
      setMauvaisMdp(true);
    }
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        className=" text-center justify-center items-center"
      >
        <Button variant="contained" onClick={handleButtonClick}>
          Inscription
        </Button>
      </Stack>
      {mauvaisMdp && (
        <div className="text-[red] p-2">mot de passe incorrect</div>
      )}
      {inscriptionOK ? (
        <div></div>
      ) : (
        <div className="text-[red] p-2">Identifiant déjà utilisé</div>
      )}
    </div>
  );
}
