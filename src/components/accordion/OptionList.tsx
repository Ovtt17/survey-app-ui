import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import OptionItem from './OptionItem';
import { QuestionOption } from '../../types/questionOption';
import { RadioGroup } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Question } from '../../types/question';
import { QuestionType } from '../../types/questionType';
import { validationRules } from '../../data/validationRules';

interface OptionListProps {
  questionIndex: number;
  requestCorrectAnswer: boolean;
  options: QuestionOption[];
  append: (value: QuestionOption) => void;
  remove: (index: number) => void;
}

const OptionList: React.FC<OptionListProps> = ({ questionIndex, requestCorrectAnswer, options, append, remove }) => {
  const { setValue, watch, setError, clearErrors, formState: { errors } } = useFormContext<{
    questions: Question[];
  }>();
  const [selectedCorrectOption, setSelectedCorrectOption] = useState<number | null>(null);
  const questionType = watch(`questions.${questionIndex}.type`) as QuestionType;

  useEffect(() => {
    if (!requestCorrectAnswer) {
      options.forEach((_, i) => {
        setValue(`questions.${questionIndex}.options.${i}.isCorrect`, false);
      });
    }
  }, [requestCorrectAnswer]);

  useEffect(() => {
    const validationResult = validationRules.options.validate(options, questionType, requestCorrectAnswer);
    if (validationResult !== true) {
      setError(`questions.${questionIndex}.options`, { type: 'manual', message: validationResult });
    } else {
      clearErrors(`questions.${questionIndex}.options`);
    }
  }, [options, questionType, requestCorrectAnswer, setError, clearErrors, questionIndex]);

  const addOption = () => {
    append({ text: '', isCorrect: false });
  };

  const removeOption = (index: number) => {
    remove(index);
    if (selectedCorrectOption === index) {
      setSelectedCorrectOption(null);
    }
    const hasMultipleOptions = options.length > 1;
    setValue(`questions.${questionIndex}.isCorrect`, hasMultipleOptions);
  };

  const handleCorrectAnswerChange = (index: number) => {
    setSelectedCorrectOption(index);
    options.forEach((_, i) => {
      setValue(`questions.${questionIndex}.options.${i}.isCorrect`, i === index);
    });
    clearErrors(`questions.${questionIndex}.options`);
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
        {errors.questions?.[questionIndex]?.options && (
          <span className="text-red-500 block mb-2">
            {errors.questions[questionIndex].options.message}
          </span>
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
