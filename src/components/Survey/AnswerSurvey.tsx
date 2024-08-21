import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurvey } from '../../services/surveyService';
import { Survey } from '../../types/survey';

const AnswerSurvey: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!survey) {
    return <div>No survey found</div>;
  }

  return (
    <div>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <p>Creator: {survey.creator.firstName}</p>
      <p>Rating: {survey.rating}</p>
      {survey.creationDate && <p>Creation Date: {survey.creationDate}</p>}
      <div>
        {survey.questions.map((question, qIndex) => (
          <div className='mt-5' key={qIndex}>
            <h3>{question.text}</h3>
            <ul>
              {question.options?.map((option, oIndex) => (
                <li key={oIndex}>{option.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnswerSurvey;