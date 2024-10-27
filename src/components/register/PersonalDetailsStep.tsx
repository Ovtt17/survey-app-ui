import { newUserValidationRules } from "../../data/newUserValidationRules";
import UserInputField from "./UserInputField";

const PersonalDetailsStep = () => {

  return (
    <>
      <UserInputField
        id="firstName"
        type="text"
        label="Nombre"
        placeholder="John"
        validationRules={newUserValidationRules.firstName}
        autoComplete="given-name"
        autoFocus
      />
      <UserInputField
        id="lastName"
        type="text"
        label="Apellido"
        placeholder="Doe"
        validationRules={newUserValidationRules.lastName}
        autoComplete="family-name"
        autoFocus
      />
    </>
  );
};

export default PersonalDetailsStep;