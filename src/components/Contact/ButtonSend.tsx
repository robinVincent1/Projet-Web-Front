import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function ButtonSend() {
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
      }}
      >
        Send
      </Button>
    </Stack>
  );
}