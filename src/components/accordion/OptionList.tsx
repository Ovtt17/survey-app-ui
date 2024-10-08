import React from 'react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import OptionItem from './OptionItem';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface OptionListProps {
  questionIndex: number;
  requestCorrectAnswer: boolean;
}

const OptionList: React.FC<OptionListProps> = ({ questionIndex, requestCorrectAnswer }) => {
  const { control } = useFormContext();

  const { fields: options, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`
  });

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
        />
      ))}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Add />}
        onClick={addOption}
      >
        Añadir Opción
      </Button>
    </div>
  );
};

export default OptionList;
