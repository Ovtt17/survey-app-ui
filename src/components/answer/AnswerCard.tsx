import { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import { Question } from '../../types/question';
import { Answer } from '../../types/answer';

interface AnswerCardProps {
  surveyId: number;
  question: Question;
  answers: Answer[];
  unansweredQuestions: number[];
  handleAnswerChange: (questionId: number, answer: Answer) => void;
}

const AnswerCard: FC<AnswerCardProps> = ({ surveyId, question, answers, unansweredQuestions, handleAnswerChange }) => {
  return (
    <div
      className={`border rounded-lg shadow-md my-5 p-5 ${unansweredQuestions.includes(question.id || 0) ? 'bg-red-100 border-red-500' : 'bg-slate-200'}`}
      key={question.id}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">
          <Typography variant="h6" gutterBottom>
            {question.text}
          </Typography>
        </FormLabel>
        <RadioGroup>
          {question.options?.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={
                <Radio
                  checked={answers.some(
                    (a) => a.questionId === question.id && a.answerText === option.text
                  )}
                  onChange={() =>
                    handleAnswerChange(question.id || 0, { surveyId: surveyId, questionId: question.id || 0, answerText: option.text })
                  }
                />
              }
              label={option.text}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default AnswerCard;