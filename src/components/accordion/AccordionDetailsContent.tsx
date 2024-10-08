import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import OptionList from './OptionList';
import { Typography, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { validationRules } from '../../data/validationRules';
import { QuestionType } from '../../types/questionType';
import { Question } from '../../types/question';

interface AccordionDetailsContentProps {
  questionIndex: number;
}

const AccordionDetailsContent: React.FC<AccordionDetailsContentProps> = ({ questionIndex }) => {
  const { control, register, watch, formState: { errors } } = useFormContext<{
    questions: Question[];
  }>();
  const { fields: options, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`
  });

  const requestCorrectAnswer = watch(`questions.${questionIndex}.isCorrect`, false) as boolean;

  return (
    <div className='flex flex-col gap-6'>
      <Typography>
        <label className="block text-gray-600 mb-1">Pregunta</label>
        <input
          type="text"
          placeholder="Texto de la Pregunta"
          className="w-full border border-gray-300 rounded-lg p-3"
          {...register(`questions.${questionIndex}.text`, validationRules.questionText)}
        />
        {errors.questions?.[questionIndex]?.text && (
          <span className="text-red-500">{errors.questions[questionIndex].text.message}</span>
        )}
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
            />
          }
          label="¿Las respuestas deben ser correctas?"
        />
        <div>
          {errors.questions?.[questionIndex]?.options && (
            <span className="text-red-500">{errors.questions[questionIndex].options.message}</span>
          )}
        </div>
      </div>
      <OptionList
        questionIndex={questionIndex}
        requestCorrectAnswer={requestCorrectAnswer}
        options={options}
        append={append}
        remove={remove}
      />
    </div>
  );
};

export default AccordionDetailsContent;