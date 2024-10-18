import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getSurveyByIdForOwner } from '../services/surveyService';
import { useAuthContext } from '../context/AuthContext';
import { useSurveyContext } from '../context/SurveyContext';

const useFetchSurveyById = () => {
  const { id: surveyId, username } = useParams<{ id: string, username: string }>();
  const { user } = useAuthContext();
  const { setValue } = useFormContext();
  const { isSurveyEditable } = useSurveyContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isNewSurvey = !surveyId;

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        if (isNewSurvey) {
          return;
        }

        if (!isSurveyEditable) {
          setError('No tienes permisos para editar encuestas de otros usuarios.');
          return;
        }

        if (surveyId && isSurveyEditable) {
          const survey = await getSurveyByIdForOwner(surveyId);
          Object.keys(survey).forEach(key => {
            setValue(key, (survey as Record<string, any>)[key]);
          });
        }
      } catch (error: any) {
        if (error.message) {
          setError(error.message);
        } else {
          setError('Error de conexión al cargar la encuesta.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadSurvey();
  }, [surveyId, isSurveyEditable, username, user, setValue]);

  return { error, loading };
};

export default useFetchSurveyById;