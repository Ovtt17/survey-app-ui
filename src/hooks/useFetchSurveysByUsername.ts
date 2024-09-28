import { getSurveysByUsername } from "../services/surveyService";
import useFetchSurveys from "./useFetchSurveys";

const useFetchSurveysByUsername = (username: string) => {
  const fetchSurveysByUsername = () => getSurveysByUsername(username);
  return useFetchSurveys(fetchSurveysByUsername);
};
export default useFetchSurveysByUsername;