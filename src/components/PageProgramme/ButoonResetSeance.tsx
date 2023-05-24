import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { ExerciceStockage } from './CreerProg';

type Props = {
    listeM: (newLM: string[]) => void;
    listeE: (newLE: ExerciceStockage[]) => void;
}

export default function ButtonResetSeance({listeM, listeE}: Props) {
  return (
    <Stack direction="row" spacing={2}>
      <Button 
      onClick={() => {
        listeE([]);
        listeM([]);
      }}
      variant="outlined" 
      startIcon={<DeleteIcon />}
      style={{
        color: "white",
        borderColor: "white",
        alignSelf: 'center', 
      }}
      >
        Supprimer
      </Button>
    </Stack>
  );
}