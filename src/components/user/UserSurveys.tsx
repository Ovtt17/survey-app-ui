import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSurveyByUser } from "../../services/surveyService";
import { Survey } from "../../types/survey";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import SurveyCard from "../survey/SurveyCard";

const UserSurveys = () => {
  const { username } = useParams<{ username: string }>();
  const [surveys, setSurveys] = useState<Survey[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const fetchedSurvey = await getSurveyByUser();
        setSurveys(fetchedSurvey);
      } catch (error) {
        setError('Error obteniendo las encuestas');
        console.error('Error obteniendo las encuestas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSurveys();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div>
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      {!surveys ? (
        <Alert severity="warning">No se encontró ninguna encuesta.</Alert>
      ) : (
          <div className="App flex flex-col items-center">
            <div className="flex flex-wrap justify-start">
              {surveys?.map((survey, index) => {
                const isOwner = survey.creator.username === username;
                return (
                  <div key={index} className="w-full sm:w-1/2 p-2">
                    <SurveyCard survey={survey} isOwner={isOwner} />
                  </div>
                );
              })}
            </div>
          </div>
      )}
    </div>
  );
}

export default UserSurveys;