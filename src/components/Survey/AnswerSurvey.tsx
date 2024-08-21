import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { Survey } from '../../types/survey';
import { getSurvey } from '../../services/surveyService';
import { NewAnswer } from '../../types/answer';
import { createAnswer } from '../../services/answerService';

const AnswerSurvey = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<NewAnswer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAnswerChange = (questionId: number, answer: NewAnswer) => {
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
    try {
      await Promise.all(answers.map((a) => createAnswer(a)));
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch {
      setError('Error al responder la encuesta.');
    }
  };

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!id) {
        setError('No surveyId provided');
        setLoading(false);
        return;
      }

      try {
        const fetchedSurvey = await getSurvey(id);
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

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!survey) {
    return (
      <Container>
        <Alert severity="warning">No survey found</Alert>
      </Container>
    );
  }

  return (
    <Container>
      {success && <Alert severity="success">Encuesta respondida correctamente.</Alert>}
      {error && <Alert severity="warning">{error}</Alert>}
      <Typography variant="h4" gutterBottom>
        {survey.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {survey.description}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <b>Creator:</b> {survey.creator.firstName} {survey.creator.lastName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <b>Rating:</b> {survey.rating}
      </Typography>
      {survey.creationDate && (
        <Typography variant="subtitle1" gutterBottom>
          <b>Creation Date:</b> {survey.creationDate}
        </Typography>
      )}
      <div>
        {survey.questions.map((question) => (
          <Paper
            key={question.id}
            elevation={3}
            style={{ margin: '20px 0', padding: '20px' }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Typography variant="h6" gutterBottom style={{ color: 'blue'}}>
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
                          handleAnswerChange(question.id, { questionId: question.id, surveyId: question.surveyId, answerText: option.text })
                        }
                      />
                    }
                    label={option.text}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>
        ))}
      </div>

      <div>
        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Container>
  );
}

export default AnswerSurvey;