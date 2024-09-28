import { useAuthContext } from "../context/AuthContext";
import SurveyCard from "../components/survey/SurveyCard";
import ErrorTemplate from "../components/error/ErrorTemplate";
import { useNavigate } from "react-router-dom";
import useFetchSurveys from "../hooks/useFetchSurveys";

const UserSurveys = () => {
  const { user } = useAuthContext();
  const { surveys, errorMessage, openErrorTemplate, setSurveys, setOpenErrorTemplate } = useFetchSurveys();
  const navigate = useNavigate();

  const handleSurveyDeleted = (id: number) => {
    setSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== id));
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Mis Encuestas</h2>
      </div>
      {surveys.length !== 0 || !openErrorTemplate ? (
        <div>
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
        
      ) : (
          <ErrorTemplate
            title="Encuestas no encontradas."
            message={errorMessage}
            buttonText="Regresar al inicio"
            onButtonClick={() => {
              setOpenErrorTemplate(false);
              navigate("/");
            }}
          />
      )}
    </div>
  );
}

export default UserSurveys;