import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonSend from "./ButtonSend";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../auth";

type Props = {
  onObject: (objetc: string) => void;
  onMessage: (message: string) => void;
};

export default function Identifiant({onObject, onMessage,}: Props) {

  const { idUser } = useAuth();  

  const [obEC, setOb] = useState("");
  const [messEC, setMess] = useState("");

  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    const jwtToken = Cookies.get("jwt");
    setToken(jwtToken);
  }, []);
  const Token = token;

  const sendMessage = async (objet: string, message: string, idUser: string, token: string) => {
    const post = {
      utilisateur: idUser,
      objet: objet,
      message: message,
    }
    try {
      const response = await fetch(`https://projet-web-api.onrender.com/api/avis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(post),
      });
  
      const data = await response.json();
  
      console.log(data);
      return data._id;
    } catch (err) {
      console.error(err);
      return "";
    }
  }

  return (
    <div className="p-8 rounded-xl shadow-lg hover:shadow-2xl border ">
      <h2 className="p-4 text-xl sm:text-xs md:text-lg lg:text-xl xl:text-xl font-bold">
        Envoie un message !
      </h2>
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
            label="Objet du message"
            multiline
            maxRows={4}
            onChange={(event) => {
              setOb(event.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            maxRows={20}
            onChange={(event) => {
              setMess(event.target.value);
            }}
            sx={{ fontSize: 30 }}
          />
        </div>
        <div className="text-center items-center justify-center p-4 flex">
          <Stack direction="row" spacing={2}>
            <Button
              style={{
                color: "black",
                backgroundColor: "white",
                borderColor: "black",
              }}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                onObject(obEC)
                onMessage(messEC)
                console.log(obEC)
               if (Token) {
                sendMessage(obEC, messEC, idUser, Token);
               }
              }}
            >
              Send
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
}
