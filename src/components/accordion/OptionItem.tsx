import React from 'react';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Remove from '@mui/icons-material/Remove';
import {QuestionOption} from '../../types/questionOption';

interface OptionItemProps {
  option: QuestionOption;
  index: number;
  isCorrect: boolean;
  onOptionChange: (index: number, value: string) => void;
  onRemoveOption: (index: number) => void;
  onCorrectOptionChange: (index: number, checked: boolean) => void;
}

const OptionItem: React.FC<OptionItemProps> = ({
  option,
  index,
  isCorrect,
  onOptionChange,
  onRemoveOption,
  onCorrectOptionChange,
}) => {
  return (
    <div className="my-2">
      <div className="flex items-center">
        <input
          type="text"
          value={option.text}
          onChange={(e) => onOptionChange(index, e.target.value)}
          placeholder={`Opción ${index + 1}`}
          className="border p-2 rounded w-full"
        />
        <IconButton onClick={() => onRemoveOption(index)} color="secondary">
          <Remove />
        </IconButton>
      </div>
      {isCorrect && (
        <div className="mt-2">
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={option.isCorrect || false}
                onChange={(e) => onCorrectOptionChange(index, e.target.checked)}
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