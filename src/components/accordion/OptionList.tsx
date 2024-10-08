import React from 'react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import OptionItem from './OptionItem';
import { useFormContext } from 'react-hook-form';
interface OptionListProps {
  questionIndex: number;
  requestCorrectAnswer: boolean;
  options: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  errors: any;
}

const OptionList: React.FC<OptionListProps> = ({ questionIndex, requestCorrectAnswer, options, append, remove, errors }) => {
  const { register } = useFormContext();

  const addOption = () => {
    append({ text: '', isCorrect: false });
  };

  const removeOption = (index: number) => {
    remove(index);
  };

  return (
    <div>
      {options.map((option, index) => (
        <OptionItem
          key={option.id}
          optionIndex={index}
          questionIndex={questionIndex}
          requestCorrectAnswer={requestCorrectAnswer}
          removeOption={() => removeOption(index)}
          register={register}
          errors={errors}
        />
      ))}
      <div className="mt-4">
        {options.length === 0 && (
          <span className="text-red-500 block mb-2">Debe haber al menos una opción</span>
        )}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={addOption}
        >
          Añadir Opción
        </Button>
      </div>
    </div>
  );
};

export default OptionList;