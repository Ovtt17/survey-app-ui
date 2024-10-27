import "dayjs/locale/es";
import { useFormContext } from "react-hook-form";
import { newUserValidationRules } from "../../data/newUserValidationRules";

const PersonalDetailsStep = () => {
  const { register, formState: { errors } } = useFormContext();


  return (
    <>
      <div>
        <label htmlFor="given-name" className="block mb-2 text-sm font-medium text-gray-900">
          Nombre
        </label>
        <input
          type="text"
          id="given-name"
          {...register('firstName', newUserValidationRules.firstName)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="John"
          required
          autoFocus
          autoComplete="given-name"
        />
        {errors.firstName && <span className="text-red-500">{String(errors.firstName.message)}</span>}
      </div>
      <div className="mt-4">
        <label htmlFor="family-name" className="block mb-2 text-sm font-medium text-gray-900">
          Apellido
        </label>
        <input
          type="text"
          id="family-name"
          {...register('lastName', newUserValidationRules.lastName)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Doe"
          required
          autoComplete="family-name"
        />
        {errors.lastName && <span className="text-red-500">{String(errors.lastName.message)}</span>}
      </div>
    </>
  );
};

export default PersonalDetailsStep;