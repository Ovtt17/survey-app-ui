import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Question} from '../../types/question.ts';
import OptionList from '../survey/OptionList.tsx';
import {QuestionType} from '../../types/questionType.ts';
import {QuestionOption} from '../../types/questionOption.ts';

interface AccordionDetailsContentProps {
  question: Question;
  onTextChange: (value: string) => void;
  onTypeChange: (event: SelectChangeEvent<Question['type']>) => void;
}

const AccordionDetailsContent: React.FC<AccordionDetailsContentProps> = ({ question, onTextChange, onTypeChange }) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState<QuestionOption[]>(question.options || []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCorrect(event.target.checked);
  };

  const handleOptionsChange = (newOptions: QuestionOption[]) => {
    setOptions(newOptions);
    question.options = newOptions;
  };

  useEffect(() => {
    setOptions(question.options || []);
  }, [question]);

  return (
    <div>
      <Typography>
        <label className="block text-gray-600 mb-1">Pregunta</label>
        <input
          type="text"
          placeholder="Texto de la Pregunta"
          className="w-full border border-gray-300 rounded-lg p-3"
          value={question.text}
          onChange={(e) => onTextChange(e.target.value)}
        />
      </Typography>
      <div className='my-6'>
        <label className="block text-gray-600 mb-2">Tipo de Pregunta</label>
        <Select
          value={question.type}
          onChange={onTypeChange}
          displayEmpty
          fullWidth
          variant='outlined'
        >
          <MenuItem value={QuestionType.TEXTO}>{QuestionType.TEXTO}</MenuItem>
          <MenuItem value={QuestionType.SELECCION_UNICA}>{QuestionType.SELECCION_UNICA}</MenuItem>
        </Select>
      </div>
      <div className='my-6'>
        <FormControlLabel
          control={
            <Checkbox
              checked={isCorrect}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="¿Las respuestas deben ser correctas?"
        />
      </div>
      <OptionList
        options={options}
        isCorrect={isCorrect}
        questionType={question.type}
        onOptionsChange={handleOptionsChange}
      />
    </div>
  );
};

export default AccordionDetailsContent;