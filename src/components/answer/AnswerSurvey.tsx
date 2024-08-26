import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Survey } from '../../types/survey';
import { getSurveyById } from '../../services/surveyService';
import { Answer } from '../../types/answer';
import { createAnswer } from '../../services/answerService';
import Rating from '@mui/material/Rating';
import RatingModal from '../survey/RatingModal';
import { createRating } from '../../services/ratingService';
import AnswerCard from './AnswerCard';

const AnswerSurvey = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
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
        const fetchedSurvey = await getSurveyById(id);
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
          <div className="flex items-center pb-5">
            <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt={`Avatar of ${survey.creator}`} />
            <div className="text-sm">
              <p className="text-gray-900">{survey.creator?.firstName} {survey.creator?.lastName}</p>
              <div>
                <span className=" text-gray-600 flex items-center">
                  Rating:
                  <Rating
                    name="read-only ml-1"
                    size="small"
                    value={survey.averageRating}
                    readOnly
                    precision={0.5}
                  />
                </span>
              </div>
            </div>
          </div>
          <Typography variant="h4" gutterBottom>
            {survey.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {survey.description}
          </Typography>
          {survey.creationDate && (
            <Typography variant="subtitle1" gutterBottom>
              <b>Creation Date:</b> {survey.creationDate}
            </Typography>
          )}
          <div>
            {
              survey && survey.questions && survey.questions.map((question) => (
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
