import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

interface OptionListProps {
  isCorrect: boolean;
}

const OptionList: React.FC<OptionListProps> = ({ isCorrect }) => {
  const [options, setOptions] = useState<string[]>(['']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (correctOptionIndex === index) {
      setCorrectOptionIndex(null);
    } else if (correctOptionIndex !== null && correctOptionIndex > index) {
      setCorrectOptionIndex(correctOptionIndex - 1);
    }
  };

  const handleCorrectOptionChange = (index: number) => {
    setCorrectOptionIndex(index);
  };

  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="my-2">
          <div className="flex items-center">
            <input
              type="text"
              value={option}
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
                    checked={correctOptionIndex === index}
                    onChange={() => handleCorrectOptionChange(index)}
                  />
                }
                label="Correcta"
              />
            </div>
          )}
        </div>
      ))}
      <Button onClick={handleAddOption} variant="contained" color="secondary" startIcon={<Add />}>
        Añadir Opción
      </Button>
    </div>
  );
};

export default OptionList;