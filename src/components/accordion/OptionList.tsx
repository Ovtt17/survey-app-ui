import React from 'react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import {QuestionType} from '../../types/questionType.ts';
import {QuestionOption} from '../../types/questionOption.ts';
import OptionItem from "./OptionItem.tsx";

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
              <OptionItem
                key={index}
                option={option}
                index={index}
                isCorrect={isCorrect}
                onOptionChange={handleOptionChange}
                onRemoveOption={handleRemoveOption}
                onCorrectOptionChange={handleCorrectOptionChange}
              />
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