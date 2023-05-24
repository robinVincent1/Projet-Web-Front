import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

type Props = {
    seance: [string, [string, string][]],
    onDelete: (e: number) => void;
    affichP: [string, [string, string][]][];
}

export default function ButtonSuppr({seance, onDelete, affichP}: Props) {
  return (
    <Stack direction="row" spacing={2}>
      <Button 
      onClick={() => {
        const index = affichP.indexOf(seance);
        onDelete(index);
      }}
      variant="outlined" 
      startIcon={<DeleteIcon />}
      style={{
        color: "black",
        borderColor: "black",
        alignSelf: 'center', 
      }}
      >
        Delete
      </Button>
    </Stack>
  );
}