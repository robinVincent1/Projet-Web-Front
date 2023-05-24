import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import CheckboxLabels from "./CheckBox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ChangeEvent } from 'react';
import { useAuth } from '../../auth';
import { useNavigate } from "react-router-dom";


export default function MultilineTextFields() {
  const [Identifiant, setIdentifiant] = useState("");
  const [MotDePasse , setMotDePasse ] = useState("");
  const { setIsLoggedIn, setIdUser, setAdmin } = useAuth();
  const navigate = useNavigate();

  const authenticate = async (Identifiant: string, MotDePasse: string) => {
    try {
      const response = await fetch('https://projet-web-api.onrender.com/api/authentification/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Identifiant, MotDePasse  })
      });
    
      const data = await response.json();
    
      if (response.ok) {
        console.log(data);
        // Stocker le jeton dans un cookie nommé "token"
        if (data.Token) {
            document.cookie = `jwt=${data.Token}; path=/; max-age=3600`;
            document.cookie = `tokenExpiryTime=${Date.now() + 3600 * 1000}; path=/; max-age=3600`;
            document.cookie = `idUser=${data.id}; path=/; max-age=3600`;
            document.cookie = `admin=${data.admin}; path=/; max-age=3600`;
        }
        setIdUser(data.id);
        setIsLoggedIn(true);
        setAdmin(data.admin);
        navigate("/Accueil");
        // Effectuer des actions en fonction de l'authentification réussie
      } else {
        console.log(data.message);
        // Afficher un message d'erreur en cas d'authentification échouée
      }
    } catch (error) {
      console.log(error);
      // Gérer l'erreur ici
    }
  };
  

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdentifiant(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMotDePasse(event.target.value);
  };


  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Identifiant"
          multiline
          maxRows={4}
          value={Identifiant}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <TextField
          type="password"
          id="outlined-multiline-flexible-password"
          label="Mot de passe"
          multiline
          maxRows={4}
          value={MotDePasse}
          onChange={handlePasswordChange}
        />
        <CheckboxLabels />
        <Stack
          direction="row"
          spacing={2}
          className="text-center justify-center items-center"
        >
          <Button variant="contained" onClick={() => {
            authenticate(Identifiant, MotDePasse)
            }}>
            Connexion
          </Button>
        </Stack>
      </div>
    </Box>
  );
}
