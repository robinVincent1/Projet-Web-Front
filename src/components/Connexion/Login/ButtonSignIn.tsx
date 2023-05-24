import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type Props = {
  onC: () => void;
}

export default function ButtonSignIn({onC}: Props) {
  return (
    <Stack spacing={2} direction="row" className='mt-4 text-center justify-center items-center text-xs sm:text-xs'>
      <Button 
      variant="text"
      onClick={onC}
      >Pas encore inscrit ?</Button>
    </Stack>
  );
}