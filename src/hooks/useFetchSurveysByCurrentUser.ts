import { useState, useEffect } from 'react';
import { getSurveysByCurrentUserWithPaging } from '../services/surveyService';
import {SurveyResponse} from '../types/survey';
import { AppError } from '../types/AppError';

const useFetchSurveysByCurrentUser = (page: number, size: number) => {
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await getSurveysByCurrentUserWithPaging(page, size);
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
  }, [page, size]);

  return { surveys, setSurveys, currentPage, totalPages, loading, error };
};

export default useFetchSurveysByCurrentUser;