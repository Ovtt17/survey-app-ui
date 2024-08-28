import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useAuthContext } from "../context/AuthContext";
import { Survey } from "../types/survey";
import { getSurveyByUser } from "../services/surveyService";
import SurveyCard from "../components/survey/SurveyCard";

const UserSurveys = () => {
  const { user } = useAuthContext();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const fetchedSurvey = await getSurveyByUser();
        setSurveys(fetchedSurvey);
      } catch (error) {
        setError('Error obteniendo las encuestas');
      } finally {
        setLoading(false);
      }
    }

    fetchSurveys();
  }, []);

  const handleSurveyDeleted = (id: number) => {
    setSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== id));
  }

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Mis Encuestas</h2>
      </div>
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      {!surveys ? (
        <Alert severity="warning">No se encontró ninguna encuesta.</Alert>
      ) : (
          <div className="App">
            <div className="flex flex-wrap justify-start">
              {surveys?.map((survey, index) => {
                const isOwner = survey.creator?.username === user?.username;
                return (
                  <div key={index} className="w-full sm:w-1/2 p-2">
                    <SurveyCard
                      survey={survey}
                      isOwner={isOwner}
                      onDelete={handleSurveyDeleted}
                    />
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