import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels() {
  return (
    <FormGroup className='text-center justify-center items-center flex'>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Se souvenir de moi" />
    </FormGroup>
  );
}