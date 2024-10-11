import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import OptionItem from './OptionItem';
import { QuestionOption } from '../../types/questionOption';
import { RadioGroup } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Question } from '../../types/question';

interface OptionListProps {
  questionIndex: number;
  requestCorrectAnswer: boolean;
  options: QuestionOption[];
  append: (value: QuestionOption) => void;
  remove: (index: number) => void;
}

const OptionList: React.FC<OptionListProps> = ({ questionIndex, requestCorrectAnswer, options, append, remove }) => {
  const { setValue,watch } = useFormContext<{
    questions: Question[];
  }>();
  const [selectedCorrectOption, setSelectedCorrectOption] = useState<number | null>(null);

  const addOption = () => {
    append({ text: '', isCorrect: false });
  };

  const removeOption = (index: number) => {
    remove(index);
    if (selectedCorrectOption === index) {
      setSelectedCorrectOption(null);
      setValue(`questions.${questionIndex}.isCorrect`, false);
    }
  };

  const handleCorrectAnswerChange = (index: number) => {
    setSelectedCorrectOption(index);
    options.forEach((_, i) => {
      setValue(`questions.${questionIndex}.options.${i}.isCorrect`, i === index);
    });
  };

  return (
    <div>
      <RadioGroup value={selectedCorrectOption}>
        {options.map((option, index) => (
          <OptionItem
            key={option.id}
            optionIndex={index}
            questionIndex={questionIndex}
            requestCorrectAnswer={requestCorrectAnswer}
            removeOption={() => removeOption(index)}
            isChecked={watch(`questions.${questionIndex}.options.${index}.isCorrect`) as boolean}
            onChange={() => handleCorrectAnswerChange(index)}
          />
        ))}
      </RadioGroup>
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
