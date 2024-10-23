import ErrorTemplate from "../components/error/ErrorTemplate";
import { useNavigate } from "react-router-dom";
import useFetchSurveysByCurrentUser from "../hooks/useFetchSurveysByCurrentUser";
import { useState } from "react";
import CreateSurveyButton from "../components/buttons/CreateSurveyButton";
import ErrorModal from "../components/error/ErrorModal";
import SurveysGlimmer from "../components/loadings/SurveysGlimmer";
import SurveyList from "../components/survey/SurveyList";

const UserSurveys = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

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

  const {
    surveys,
    setSurveys,
    totalPages,
    loading,
    error
  } = useFetchSurveysByCurrentUser(page, pageSize);

  const handleSurveyDeleted = (id: number) => {
    setSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== id));
  }

  const hasSurveys = surveys.length > 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <SurveysGlimmer />
      </div>
    )
  }
  if (error) {
    return (
      <ErrorTemplate
        title="Encuestas no encontradas."
        message={error}
        buttonText="Regresar al inicio"
        onButtonClick={() => {
          navigate("/");
        }}
      />
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Mis Encuestas</h2>
      </div>
      {hasSurveys && (
        <SurveyList
          surveys={surveys}
          totalPages={totalPages}
          page={page}
          onPageChange={handleSurveyPageChange}
          handleSurveyDeleted={handleSurveyDeleted}
        />
      )}
      <CreateSurveyButton handleOpenErrorModal={() => handleOpenErrorModal} />
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
}

export default UserSurveys;