import { useEffect, useState } from "react";
import { SurveyResponse } from "../types/survey";
import { getSurveysByUsernameWithPaging } from "../services/surveyService";
import { AppError } from "../types/AppError";

const useFetchSurveysByUsername = (username: string, page: number, size: number) => {
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    if (!username) return;
    const fetchSurveys = async () => {
      try {
        const response = await getSurveysByUsernameWithPaging(username, page, size);
        setSurveys(response.surveys);
        setCurrentPage(response.page + 1);
        setTotalPages(response.totalPages);
      } catch (error: unknown) {
        setError(error as AppError);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, [username, page, size]);

  return { surveys, setSurveys, currentPage, totalPages, loading, error };
};

export default useFetchSurveysByUsername;