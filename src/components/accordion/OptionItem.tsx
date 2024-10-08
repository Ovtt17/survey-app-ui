import React from 'react';
import IconButton from '@mui/material/IconButton';
import Remove from '@mui/icons-material/Remove';
import { validationRules } from '../../data/validationRules';
import { useFormContext } from 'react-hook-form';
import { Question } from '../../types/question';
import { FormControl, FormControlLabel, Radio } from '@mui/material';

interface OptionItemProps {
  optionIndex: number;
  questionIndex: number;
  requestCorrectAnswer: boolean;
  removeOption: () => void;
  isChecked: boolean;
  onChange: () => void;
}

const OptionItem: React.FC<OptionItemProps> = ({
  optionIndex,
  questionIndex,
  requestCorrectAnswer,
  removeOption,
  isChecked,
  onChange,
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
          <FormControl>
            <FormControlLabel
              control={
                <Radio
                  checked={isChecked}
                  onChange={onChange}
                />
              }
              label="Correcta"
            />
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default OptionItem;
