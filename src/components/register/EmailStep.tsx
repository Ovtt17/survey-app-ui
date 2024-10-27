import { useFormContext } from "react-hook-form";
import { newUserValidationRules } from "../../data/newUserValidationRules";

const EmailStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
        Correo Electrónico
      </label>
      <input
        type="email"
        id="email"
        {...register('email', newUserValidationRules.email)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="john@email.com"
        required
        autoComplete="email"
      />
      {errors.email && <span className="text-red-500">{String(errors.email.message)}</span>}
    </div>
  );
}

export default EmailStep;