import SurveyCard from "../components/survey/SurveyCard";
import surveys from "../data/surveys";

const Home = () => {
  const handleAnswerSurvey = () => {
    console.log("Responder Encuesta");
  };

  const handleViewReviews = () => {
    console.log("Ver Reseñas");
  };

  const handleRateSurvey = () => {
    console.log("Valorar");
  };

  return (
    <div className="App flex flex-col items-center">
      <div className="flex flex-wrap justify-start">
        {surveys.map((survey, index) => (
          <div key={index} className="w-full sm:w-1/2 p-2">
            <SurveyCard
              survey={survey}
              onAnswerSurvey={handleAnswerSurvey}
              onViewReviews={handleViewReviews}
              onRateSurvey={handleRateSurvey}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;