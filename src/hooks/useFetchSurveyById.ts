import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getSurveyByIdForOwner } from '../services/surveyService';
import { useAuthContext } from '../context/AuthContext';
import { useSurveyContext } from '../context/SurveyContext';

const useFetchSurveyById = () => {
  const { id: surveyId, username } = useParams<{ id: string, username: string }>();
  const { user } = useAuthContext();
  const { setValue } = useFormContext();
  const { isSurveyEditable } = useSurveyContext();

  useEffect(() => {
    if (surveyId && isSurveyEditable) {
      const loadSurvey = async () => {
        try {
          const survey = await getSurveyByIdForOwner(surveyId);
          Object.entries(survey).forEach(([key, value]) => {
            setValue(key, value);
          });
        } catch (error) {
          console.error('Error loading survey:', error);
        }
      };
      loadSurvey();
    }
  }, [surveyId, isSurveyEditable, username, user]);
};

export default useFetchSurveyById;