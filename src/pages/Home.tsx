import { useState } from "react";
import CreateSurveyButton from "../components/buttons/CreateSurveyButton";
import ErrorModal from "../components/error/ErrorModal";
import { useNavigate } from "react-router-dom";
import useFetchSurveys from "../hooks/useFetchSurveys";
import SurveyList from "../components/survey/SurveyList";
import NotFound from "../components/error/NotFound";
import SurveysGlimmer from "../components/loadings/SurveysGlimmer";

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const {
    surveys,
    error,
    totalPages,
    loading
  } = useFetchSurveys(page, pageSize);
  const thereAreSurveys = surveys.length > 0;

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  const handleConfirmLogin = () => {
    setOpenErrorModal(false);
    navigate("/login");
  };

  const handleSurveyPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return (
      <div className="App flex flex-col items-center">
        <SurveysGlimmer />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center">
      {thereAreSurveys ? (
        <SurveyList
          surveys={surveys}
          totalPages={totalPages}
          page={page}
          onPageChange={handleSurveyPageChange}
        />
      ) : (
        <NotFound errorMessage={error} />
      )}
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