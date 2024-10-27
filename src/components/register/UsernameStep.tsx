import { newUserValidationRules } from "../../data/newUserValidationRules";
import UserInputField from './UserInputField';

const UsernameStep = () => {
  return (
    <UserInputField
      id="username"
      type="text"
      label="Nombre de Usuario"
      placeholder="John123"
      validationRules={newUserValidationRules.username}
      autoComplete="username"
      autoFocus
    />
  );
}

export default UsernameStep;