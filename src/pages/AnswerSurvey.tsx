import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { SurveySubmission } from '../types/survey';
import { getSurveyByIdForSubmission } from '../services/surveyService';
import { Answer } from '../types/answer';
import { createAnswer } from '../services/answerService';
import RatingModal from '../components/rating/RatingModal';
import { createRating } from '../services/ratingService';
import SurveyDetails from '../components/answer/SurveyDetails';
import QuestionsToAnswerList from '../components/answer/QuestionsToAnswerList';

const AnswerSurvey = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<SurveySubmission | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);
  const [ratingModalOpen, setRatingModalOpen] = useState<boolean>(false);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  const handleAnswerChange = (questionId: number, answer: Answer) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (a) => a.questionId === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = answer;
        return updatedAnswers;
      } else {
        return [...prevAnswers, answer];
      }
    });
  };

  const handleSubmit = async () => {
    if (survey) {
      const unanswered = survey.questions
        .filter((question) => !answers.some((a) => a.questionId === question.id))
        .map((question) => question.id);

      if (unanswered.length > 0) {
        setUnansweredQuestions(unanswered as number[]);
        setError('Por favor, responda todas las preguntas.');
        window.scrollTo(0, 0);
        return;
      }
    }

    try {
      await createAnswer(answers);
      setSuccess(true);
      setRatingModalOpen(true);
      setShouldScroll(true);
    } catch {
      setError('Error al responder la encuesta.');
    }
  };

  const handleRatingSubmit = async (rated: number) => {
    try {
      await createRating({ surveyId: survey?.id || 0, rating: rated });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Failed to submit rating", error);
    }
  };

  useEffect(() => {
    if (!ratingModalOpen && shouldScroll) {
      window.scrollTo(0, 0);
      setShouldScroll(false);
    }
  }, [ratingModalOpen, shouldScroll]);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!id) {
        setError('No surveyId provided');
        setLoading(false);
        return;
      }

      try {
        const fetchedSurvey = await getSurveyByIdForSubmission(id);
        setSurvey(fetchedSurvey);
      } catch (error) {
        setError('Error fetching survey');
        console.error('Error fetching survey:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container className='pt-5'>
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      {success && <Alert severity="success" className="mb-4">Encuesta respondida correctamente.</Alert>}
      {!survey ? (
        <Alert severity="warning">No se encontró ninguna encuesta</Alert>
      ) : (
        <>
          <SurveyDetails survey={survey} />
          <QuestionsToAnswerList
            survey={survey}
            answers={answers}
            unansweredQuestions={unansweredQuestions}
            handleAnswerChange={handleAnswerChange}
          />
          <div className='flex justify-end items-end'>
            <Button variant='contained' color='success' onClick={handleSubmit}>
              ENVIAR
            </Button>
          </div>
          <RatingModal
            open={ratingModalOpen}
            onClose={() => setRatingModalOpen(false)}
            userRating={0}
            onRate={handleRatingSubmit}
          />
        </>
      )}
    </Container>
  );
}

export default AnswerSurvey;
