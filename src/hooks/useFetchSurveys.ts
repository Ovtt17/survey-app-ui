import { useState, useEffect, startTransition } from "react";
import {SurveySubmission} from "../types/survey";

const useFetchSurveys = (fetchFunction: () => Promise<SurveySubmission[]>) => {
  const [surveys, setSurveys] = useState<SurveySubmission[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openErrorTemplate, setOpenErrorTemplate] = useState(false);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const fetchedSurveys = await fetchFunction();
        setSurveys(fetchedSurveys);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        startTransition(() => {
          setErrorMessage(errorMessage);
          setOpenErrorTemplate(true);
        });
      }
    };

    fetchSurveys();
  }, [fetchFunction]);

  return { surveys, errorMessage, openErrorTemplate, setSurveys, setOpenErrorTemplate };
};

export default useFetchSurveys;
