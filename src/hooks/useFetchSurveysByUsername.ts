import { startTransition, useEffect, useState } from "react";
import {SurveyResponse} from "../types/survey";
import { getSurveysByUsernameWithPaging } from "../services/surveyService";

const useFetchSurveysByUsername = (username: string, page: number, size: number) => {
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openErrorTemplate, setOpenErrorTemplate] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!username) return;
    const fetchSurveys = async () => {
      try {
        const response = await getSurveysByUsernameWithPaging(username, page, size);
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
  }, [username, page]);

  return { surveys, errorMessage, openErrorTemplate, setSurveys, setOpenErrorTemplate, currentPage, totalPages };
};

export default useFetchSurveysByUsername;