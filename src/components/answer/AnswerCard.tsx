import { FC } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  TextField,
  Paper,
} from '@mui/material';
import { Question } from '../../types/question';
import { Answer } from '../../types/answer';
import { QuestionType } from '../../types/questionType';

interface AnswerCardProps {
  surveyId: number;
  question: Question;
  answers: Answer[];
  unansweredQuestions: number[];
  handleAnswerChange: (questionId: number, answer: Answer) => void;
}

const AnswerCard: FC<AnswerCardProps> = ({
  surveyId,
  question,
  answers,
  unansweredQuestions,
  handleAnswerChange,
}) => {
  const handleRadioChange = (optionText: string) => {
    handleAnswerChange(question.id || 0, { surveyId, questionId: question.id || 0, answerText: optionText });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleAnswerChange(question.id || 0, { surveyId, questionId: question.id || 0, answerText: event.target.value });
  };

  return (
    <Paper
      elevation={3}
      className={`my-5 p-5 ${unansweredQuestions.includes(question.id || 0) ? 'bg-red-100 border-red-500' : 'bg-slate-200'}`}
    >
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">
          <Typography variant="h6" gutterBottom>
            {question.text}
          </Typography>
        </FormLabel>
        <RadioGroup>
          {question.type === QuestionType.SELECCION_UNICA && (
            <>
              {question.options?.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={
                    <Radio
                      checked={answers.some((a) => a.questionId === question.id && a.answerText === option.text)}
                      onChange={() => handleRadioChange(option.text)}
                    />
                  }
                  label={<Typography variant="body1">{option.text}</Typography>}
                />
              ))}
            </>
          )}
          {question.type === QuestionType.TEXTO && (
            <TextField
              fullWidth
              variant="outlined"
              value={answers.find((a) => a.questionId === question.id)?.answerText || ''}
              onChange={handleTextChange}
              label="Your answer"
              margin="normal"
              multiline
              rows={4}
              helperText="Please provide your response."
            />
          )}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default AnswerCard;
