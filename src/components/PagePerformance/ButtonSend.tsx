import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

type Props = {
    exoEC:  string;
    listeP: [string, string][];
    setAffP:  (newAP: [string, [string, string][]][]) => void;
    setListeP:  (newLP: [string, string][]) => void;
    affP:  [string, [string, string][]][];
}

export default function ButtonSend({exoEC, listeP, setAffP, setListeP, affP}: Props) {
  return (
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
        const newAffperf: [string, [string, string][]] = [
          exoEC,
          listeP,
        ];
        console.log(listeP)
        setAffP([...affP, newAffperf]);
        setListeP([]);
      }}
      >
        Send
      </Button>
    </Stack>
  );
}