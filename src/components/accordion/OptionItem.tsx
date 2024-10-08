import React from 'react';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Remove from '@mui/icons-material/Remove';
import { useFormContext } from 'react-hook-form';

interface OptionItemProps {
  optionIndex: number;
  questionIndex: number;
  requestCorrectAnswer: boolean;
  removeOption: () => void;
}

const OptionItem: React.FC<OptionItemProps> = ({ optionIndex, questionIndex, requestCorrectAnswer, removeOption }) => {
  const { register } = useFormContext();

  return (
    <div className="my-2">
      <div className="flex items-center">
        <input
          type="text"
          placeholder={`Opción ${optionIndex + 1}`}
          className="border p-2 rounded w-full"
          {...register(`questions.${questionIndex}.options.${optionIndex}.text`)}
        />
        <IconButton color="secondary" onClick={removeOption}>
          <Remove />
        </IconButton>
      </div>
      {requestCorrectAnswer && (
        <div className="mt-2">
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register(`questions.${questionIndex}.options.${optionIndex}.isCorrect`)}
              />
            }
            label="Correcta"
          />
        </div>
      )}
    </div>
  );
};

export default OptionItem;
