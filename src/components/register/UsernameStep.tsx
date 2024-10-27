import { useFormContext } from "react-hook-form";
import { newUserValidationRules } from "../../data/newUserValidationRules";

const UsernameStep = () => {

  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
        Nombre
      </label>
      <input
        type="text"
        id="username"
        {...register('firstName', newUserValidationRules.username)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="John"
        required
        autoFocus
        autoComplete="username"
      />
      {errors.firstName && <span className="text-red-500">{String(errors.firstName.message)}</span>}
    </div>
  );
}

export default UsernameStep;