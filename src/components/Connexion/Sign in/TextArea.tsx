import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';
import ButtonSignInS from './ButtonSignIn';
import CheckboxLabels from '../Login/CheckBox';

type Props = {
  onButton: () => void;
}

export default function MultilineTextFieldsS({onButton}: Props) {

  const [identifiant, setIdentifiant] = React.useState('');
  const handleIdentifiant = (event: ChangeEvent<HTMLInputElement>) => {
    setIdentifiant(event.target.value);
  }

  const [mdp, setMdp] = React.useState(" ");
  const handleMdp = (event: ChangeEvent<HTMLInputElement>) => {
    setMdp(event.target.value);
  }

  const [confirmMdp, setConfirmMdp] = React.useState("");
  const handleConfirmMdp = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmMdp(event.target.value);
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
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
          onChange={handleIdentifiant}
        />
        </div>
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Mot de passe"
          multiline
          maxRows={4}
          onChange={handleMdp}
        />
        </div>
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Confirmer"
          multiline
          maxRows={4}
          onChange={handleConfirmMdp}
        />
        </div>
        <CheckboxLabels />
        <ButtonSignInS Identifiant={identifiant} mdp={mdp} confirmMdp={confirmMdp} onButton={onButton}/>
   </Box>
  );
}