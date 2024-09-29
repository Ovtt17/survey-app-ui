import { useState, useEffect, startTransition } from 'react';
import { getCurrentUserSurveys } from '../services/surveyService';
import {SurveySubmission} from '../types/survey';

const useFetchSurveysForOwner = () => {
  const [surveys, setSurveys] = useState<SurveySubmission[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openErrorTemplate, setOpenErrorTemplate] = useState(false);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const fetchedSurvey = await getCurrentUserSurveys();
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

export default useFetchSurveysForOwner;