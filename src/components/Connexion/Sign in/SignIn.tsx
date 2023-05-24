
import MultilineTextFieldsS from "./TextArea";
import ButtonSignInS from "./ButtonSignIn";
import ButtonConnexionS from "./ButtonConnexion";
import CheckboxLabels from "../Login/CheckBox";

type Props = {
    onSignUp: () => void;
  }

export const SignIn = ({onSignUp}: Props) => {
  return (
    <div className="text-center justify-center items-center flexr">
      <form className="border  hover:shadow-2xl p-8 shadow-lg rounded-3xl text-center justify-center items-center">
        <label className="text-xl sm:text-sm md:text-lg lg:text-xl xl:text-2xl">Inscription</label>
        <div>
          <MultilineTextFieldsS onButton={onSignUp}/>
          <ButtonConnexionS onButton={onSignUp}/>
        </div>
      </form>
    </div>
  );
};
