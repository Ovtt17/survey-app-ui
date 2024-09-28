import { getCurrentUserSurveys } from '../services/surveyService';
import useFetchSurveys from './useFetchSurveys';

const useFetchSurveysForOwner = () => {
  return useFetchSurveys(getCurrentUserSurveys);
};

export default useFetchSurveysForOwner;