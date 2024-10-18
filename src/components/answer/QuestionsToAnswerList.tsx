import { FC } from 'react';
import { SurveySubmission } from '../../types/survey';
import AnswerCard from './AnswerCard';
import { Answer } from '../../types/answer';

interface QuestionsToAnswerListProps {
  survey: SurveySubmission;
  answers: Answer[];
  unansweredQuestions: number[];
  handleAnswerChange: (questionId: number, answer: Answer) => void;
}

const QuestionsToAnswerList: FC<QuestionsToAnswerListProps> = ({ survey, answers, unansweredQuestions, handleAnswerChange }) => {
  return (
    <div>
      {survey && survey.questions && survey.questions.map((question) => (
        <AnswerCard
          key={question.id}
          surveyId={survey.id || 0}
          question={question}
          answers={answers}
          unansweredQuestions={unansweredQuestions}
          handleAnswerChange={handleAnswerChange}
        />
      ))}
    </div>
  );
}

export default QuestionsToAnswerList;