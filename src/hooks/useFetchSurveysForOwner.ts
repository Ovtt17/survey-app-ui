import { useState, useEffect, startTransition } from 'react';
import { getSurveysByCurrentUser } from '../services/surveyService';
import {SurveyResponse} from '../types/survey';

const useFetchSurveysByCurrentUser = () => {
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openErrorTemplate, setOpenErrorTemplate] = useState(false);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const fetchedSurvey = await getSurveysByCurrentUser();
        setSurveys(fetchedSurvey);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        startTransition(() => {
          setErrorMessage(errorMessage);
          setOpenErrorTemplate(true);
        });
      }
    };

    fetchSurveys();
  }, []);

  return { surveys, errorMessage, openErrorTemplate, setSurveys, setOpenErrorTemplate };
};

export default useFetchSurveysByCurrentUser;