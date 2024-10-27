import { newUserValidationRules } from "../../data/newUserValidationRules";
import UserInputField from "./UserInputField";

const EmailStep = () => {
  return (
    <UserInputField
      id="email"
      type="email"
      label="Correo Electrónico"
      placeholder="john@mail.com"
      validationRules={newUserValidationRules.email}
      autoComplete="email"
      autoFocus
    />
  );
}

export default EmailStep;