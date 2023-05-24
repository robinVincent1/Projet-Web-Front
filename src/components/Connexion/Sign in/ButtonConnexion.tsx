import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type Props = {
    onButton: () => void;
  }

export default function ButtonConnexionS({onButton}: Props) {
  return (
    <Stack spacing={2} direction="row" className='pt-4 text-center justify-center items-center'>
      <Button 
      variant="text"
      onClick={onButton}
      >Déjà inscrit ?</Button>
    </Stack>
  );
}