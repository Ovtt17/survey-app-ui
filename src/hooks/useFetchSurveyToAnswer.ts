import { useEffect, useState } from 'react';
import { SurveySubmission } from '../types/survey';
import { getSurveyByIdForSubmission } from '../services/surveyService';
import { useParams } from 'react-router-dom';

const useFetchSurveyToAnswer = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<SurveySubmission | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!id) {
        setError('No se proporcionó un ID de encuesta');
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

  return { survey, loading, error, setError };
};

export default useFetchSurveyToAnswer;