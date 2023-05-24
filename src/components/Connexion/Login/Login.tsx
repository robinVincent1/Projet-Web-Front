import React from 'react';
import '../../../styles/App.css';
import MultilineTextFields from './TextArea';
import ButtonSignIn from './ButtonSignIn';

type Props = {
  onConnexion: () => void;
}

export const Login = ({onConnexion}: Props) => {
    return (
        <div className='text-center justify-center items-center flex '>
      <form className="border  hover:shadow-2xl p-8 shadow-xl rounded-3xl text-center justify-center items-center">
        <label className='text-2xl sm:text-lg md:text-lg lg:text-xl xl:text-2xl'>
          Connexion
        </label>
        <MultilineTextFields />
        
        <ButtonSignIn onC={onConnexion} />
      </form>
    </div>
    )
}