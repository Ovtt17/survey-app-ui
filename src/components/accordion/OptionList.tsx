import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import {QuestionType} from '../../types/questionType.ts';
import {QuestionOption} from '../../types/questionOption.ts';

interface OptionListProps {
  options: QuestionOption[];
  onOptionsChange: (options: QuestionOption[]) => void;
  isCorrect: boolean;
  questionType: string;
}

const OptionList: React.FC<OptionListProps> = ({ options, onOptionsChange, isCorrect, questionType,  }) => {
  const defaultOption: QuestionOption = { text: '', isCorrect: false };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    onOptionsChange(newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...options, defaultOption];
    onOptionsChange(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    onOptionsChange(newOptions);
  };

  const handleCorrectOptionChange = (index: number, checked: boolean) => {
    const newOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index ? checked : false,
    }));
    onOptionsChange(newOptions);
  };

  const isDisabled = questionType === QuestionType.TEXTO && !isCorrect;
  return (
    <div>
      {
        !isDisabled && (
          <>
            {options.map((option, index) => (
              <div key={index} className="my-2">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Opción ${index + 1}`}
                    className="border p-2 rounded w-full"
                  />
                  <IconButton onClick={() => handleRemoveOption(index)} color="secondary">
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
                          onChange={(e) => handleCorrectOptionChange(index, e.target.checked)}
                        />
                      }
                      label="Correcta"
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      <Button
        onClick={handleAddOption}
        variant="contained"
        color="secondary"
        startIcon={<Add />}
        disabled={isDisabled}
      >
        Añadir Opción
      </Button>
    </div>
  );
};
export default OptionList;