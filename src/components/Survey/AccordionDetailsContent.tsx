import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { NewQuestion } from '../../types/question';
import OptionList from './OptionList';

interface AccordionDetailsContentProps {
  question: NewQuestion;
  onTextChange: (value: string) => void;
  onTypeChange: (event: SelectChangeEvent<NewQuestion['type']>) => void;
}

const AccordionDetailsContent: React.FC<AccordionDetailsContentProps> = ({ question, onTextChange, onTypeChange }) => {
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCorrect(event.target.checked);
  };

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
        >
          <MenuItem value="Texto">Texto</MenuItem>
          <MenuItem value="Opción Única">Opción Única</MenuItem>
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
      <OptionList isCorrect={isCorrect} />
    </div>
  );
};

export default AccordionDetailsContent;