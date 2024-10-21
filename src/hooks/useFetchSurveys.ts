import { useState, useEffect } from "react";
import {SurveyResponse} from "../types/survey";
import { getSurveys } from "../services/surveyService";

const useFetchSurveys = (page: number, size: number) => {
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      setLoading(true);
      try {
        const response = await getSurveys(page, size);
        setSurveys(response.surveys);
        setCurrentPage(response.page + 1);
        setTotalPages(response.totalPages);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, [page]);

  return { surveys, error, currentPage, totalPages, loading };
};

export default useFetchSurveys;
