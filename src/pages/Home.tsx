import { useEffect, useState } from "react";
import SurveyCard from "../components/survey/SurveyCard";
import {SurveyResponse} from "../types/survey";
import { getSurveys } from "../services/surveyService";
import CreateSurveyButton from "../components/buttons/CreateSurveyButton";
import ErrorModal from "../components/error/ErrorModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  const handleConfirmLogin = () => {
    setOpenErrorModal(false);
    navigate("/login");
  };

  useEffect(() => {
    const fetchSurveys = async () => {
      const surveys = await getSurveys();
      setSurveys(surveys);
    };
    fetchSurveys();
  }, []);

  return (
    <div className="App flex flex-col items-center">
      <div className="flex flex-wrap justify-start">
        {surveys?.map((survey, index) => (
          <div key={index} className="w-full md:w-1/2 p-2">
            <SurveyCard
              survey={survey}
            />
          </div>
        ))}
      </div>
      <CreateSurveyButton handleOpenErrorModal={handleOpenErrorModal} />
      <ErrorModal
        open={openErrorModal}
        setOpen={setOpenErrorModal}
        title="Error"
        message="Para realizar esta acción es necesario iniciar sesión"
        confirmText="Iniciar Sesión"
        onConfirm={handleConfirmLogin}
      />
    </div>
  );
};

export default Home;