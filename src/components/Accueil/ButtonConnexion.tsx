import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';


export default function ButtonSend() {
  return (
    <Stack direction="row" spacing={2}>
      <Button 
      component={NavLink}
      to="/Login"
      style={{
        color: "black",
        backgroundColor: "white",
        borderColor: "black",
      }}
      variant="contained" 
      endIcon={<FaUserCircle />}
      >
        Connexion/Inscription
      </Button>
    </Stack>
  );
}