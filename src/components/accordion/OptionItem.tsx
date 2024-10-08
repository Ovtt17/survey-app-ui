import React from 'react';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Remove from '@mui/icons-material/Remove';
import { validationRules } from '../../data/validationRules';
import { useFormContext } from 'react-hook-form';
import { Question } from '../../types/question';

interface OptionItemProps {
  optionIndex: number;
  questionIndex: number;
  requestCorrectAnswer: boolean;
  removeOption: () => void;
}

const OptionItem: React.FC<OptionItemProps> = ({
  optionIndex,
  questionIndex,
  requestCorrectAnswer,
  removeOption
}) => {
  const { register, formState: { errors } } = useFormContext<{
    questions: Question[];
  }>();

  return (
    <div className="my-2">
      <div className="flex items-center">
        <input
          type="text"
          placeholder={`Opción ${optionIndex + 1}`}
          className="border p-2 rounded w-full"
          {...register(`questions.${questionIndex}.options.${optionIndex}.text`, validationRules.optionText)}
        />
        <IconButton color="secondary" onClick={removeOption}>
          <Remove />
        </IconButton>
      </div>
      {errors.questions?.[questionIndex]?.options?.[optionIndex]?.text && (
        <span className="text-red-500">{errors.questions[questionIndex].options[optionIndex].text.message}</span>
      )}
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