import { useState, useEffect, startTransition } from 'react';
import { getSurveysByCurrentUserWithPaging } from '../services/surveyService';
import {SurveyResponse} from '../types/survey';

const useFetchSurveysByCurrentUser = (page: number, size: number) => {
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openErrorTemplate, setOpenErrorTemplate] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await getSurveysByCurrentUserWithPaging(page, size);
        setSurveys(response.surveys);
        setCurrentPage(response.page + 1);
        setTotalPages(response.totalPages);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        startTransition(() => {
          setErrorMessage(errorMessage);
          setOpenErrorTemplate(true);
        });
      }
    };

    fetchSurveys();
  }, [page]);

  return { surveys, errorMessage, openErrorTemplate, setSurveys, setOpenErrorTemplate, currentPage, totalPages };
};

export default useFetchSurveysByCurrentUser;