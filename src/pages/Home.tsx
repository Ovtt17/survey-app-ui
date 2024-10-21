import { useState } from "react";
import CreateSurveyButton from "../components/buttons/CreateSurveyButton";
import ErrorModal from "../components/error/ErrorModal";
import { useNavigate } from "react-router-dom";
import useFetchSurveys from "../hooks/useFetchSurveys";
import ErrorTemplate from "../components/error/ErrorTemplate";
import LoadingComponent from "../components/loadings/LoadingComponent";
import SurveyList from "../components/survey/SurveyList";
import NotFound from "../components/error/NotFound";

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
    return <LoadingComponent />;
  }

  if (error) {
    return <NotFound errorMessage={error} />;
  }

  return (
    <>
      <div className="App flex flex-col items-center">
        {thereAreSurveys ? (
          <>
            <SurveyList
              surveys={surveys}
              totalPages={totalPages}
              page={page}
              onPageChange={handleSurveyPageChange}
            />
          </>
        ) : (
          <ErrorTemplate
            title="No se encontraron encuestas"
            message="Actualmente no hay encuestas disponibles. ¡Crea una nueva encuesta para empezar!"
          />
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
    </>
  );
};

export default Home;