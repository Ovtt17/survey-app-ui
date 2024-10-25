import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getSurveyByIdForOwner } from '../services/surveyService';
import { useAuthContext } from '../context/AuthContext';
import { useSurveyContext } from '../context/SurveyContext';
import { AppError } from '../types/AppError';
import { AnimationPaths } from '../constants/animationPaths';

const useFetchSurveyById = () => {
  const { id: surveyId, username } = useParams<{ id: string, username: string }>();
  const { user } = useAuthContext();
  const { setValue } = useFormContext();
  const { isSurveyEditable } = useSurveyContext();
  const [error, setError] = useState<AppError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isNewSurvey = !surveyId;

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        if (isNewSurvey) {
          return;
        }

        if (!isSurveyEditable) {
          setError({
            name: 'ForbiddenError',
            title: 'No permitido',
            message: 'No tienes permiso para editar esta encuesta.',
            animationSrc: AnimationPaths.Forbidden,
            buttonText: 'Mis Encuestas'
          });
          return;
        }

        if (surveyId && isSurveyEditable) {
          const survey = await getSurveyByIdForOwner(surveyId);
          Object.keys(survey).forEach(key => {
            setValue(key, (survey as unknown as Record<string, unknown>)[key]);
          });
        }
      } catch (error: unknown) {
        setError(error as AppError);
      } finally {
        setLoading(false);
      }
    };

    loadSurvey();
  }, [surveyId, isSurveyEditable, username, user, setValue, isNewSurvey]);

  return { error, loading };
};

export default useFetchSurveyById;