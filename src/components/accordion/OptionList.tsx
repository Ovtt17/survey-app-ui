import React from 'react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import OptionItem from './OptionItem';
import { QuestionOption } from '../../types/questionOption';
interface OptionListProps {
  questionIndex: number;
  requestCorrectAnswer: boolean;
  options: QuestionOption[];
  append: (value: QuestionOption) => void;
  remove: (index: number) => void;
}

const OptionList: React.FC<OptionListProps> = ({ questionIndex, requestCorrectAnswer, options, append, remove }) => {
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