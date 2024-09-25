import { startTransition, useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { Survey } from "../types/survey";
import { getSurveyByUser } from "../services/surveyService";
import SurveyCard from "../components/survey/SurveyCard";
import ErrorTemplate from "../components/error/ErrorTemplate";
import { useNavigate } from "react-router-dom";

const UserSurveys = () => {
  const { user } = useAuthContext();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [openErrorTemplate, setOpenErrorTemplate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const fetchedSurvey = await getSurveyByUser();
        setSurveys(fetchedSurvey);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        startTransition(() => {
          setErrorMessage(errorMessage);
          setOpenErrorTemplate(true);
        });
      }
    }

    fetchSurveys();
  }, []);

  const handleSurveyDeleted = (id: number) => {
    setSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== id));
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Mis Encuestas</h2>
      </div>
      {surveys.length === 0 || openErrorTemplate ? (
        <ErrorTemplate
          title="Encuestas no encontradas."
          message={errorMessage}
          buttonText="Regresar al inicio"
          onButtonClick={() => {
            setOpenErrorTemplate(false);
            navigate("/");
          }}
        />
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