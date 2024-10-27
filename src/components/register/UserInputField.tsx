import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

interface UserInputFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  validationRules: RegisterOptions;
  autoComplete?: string;
  autoFocus?: boolean;
}

const UserInputField: React.FC<UserInputFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  validationRules,
  autoComplete,
  autoFocus = false,
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, validationRules)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        autoFocus={autoFocus}
        autoComplete={autoComplete}
      />
      {errors[id] && <span className="text-red-500">{String(errors[id].message)}</span>}
    </div>
  );
};

export default UserInputField;