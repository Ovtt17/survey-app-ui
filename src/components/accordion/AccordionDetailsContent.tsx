import React from 'react';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OptionList from './OptionList';
import { QuestionType } from '../../types/questionType';
import { useFormContext, Controller } from 'react-hook-form';

interface AccordionDetailsContentProps {
  questionIndex: number;
}

const AccordionDetailsContent: React.FC<AccordionDetailsContentProps> = ({ questionIndex }) => {
  const { control, register, watch } = useFormContext();

  const requestCorrectAnswer = watch(`questions.${questionIndex}.isCorrect`, false);

  return (
    <div className='flex flex-col gap-6'>
      <Typography>
        <label className="block text-gray-600 mb-1">Pregunta</label>
        <input
          type="text"
          placeholder="Texto de la Pregunta"
          className="w-full border border-gray-300 rounded-lg p-3"
          {...register(`questions.${questionIndex}.text`)}
        />
      </Typography>
      <div>
        <label className="block text-gray-600 mb-2">Tipo de Pregunta</label>
        <Controller
          control={control}
          name={`questions.${questionIndex}.type`}
          defaultValue={QuestionType.SELECCION_UNICA}
          render={({ field }) => (
            <Select
              {...field}
              displayEmpty
              fullWidth
              variant='outlined'
            >
              <MenuItem value={QuestionType.SELECCION_UNICA}>{QuestionType.SELECCION_UNICA}</MenuItem>
              <MenuItem value={QuestionType.TEXTO}>{QuestionType.TEXTO}</MenuItem>
            </Select>
          )}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              {...register(`questions.${questionIndex}.isCorrect`)}
              color="primary"
            />
          }
          label="¿Las respuestas deben ser correctas?"
        />
      </div>
      <OptionList
        questionIndex={questionIndex}
        requestCorrectAnswer={requestCorrectAnswer}
      />
    </div>
  );
};

export default AccordionDetailsContent;
