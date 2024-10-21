import { useState } from "react";
import SurveyCard from "../components/survey/SurveyCard";
import CreateSurveyButton from "../components/buttons/CreateSurveyButton";
import ErrorModal from "../components/error/ErrorModal";
import { useNavigate } from "react-router-dom";
import useFetchSurveys from "../hooks/useFetchSurveys";
import { Pagination } from "@mui/material";
import ErrorTemplate from "../components/error/ErrorTemplate";
import LoadingComponent from "../components/loadings/LoadingComponent";

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const { surveys, errorMessage, openErrorTemplate, setOpenErrorTemplate, totalPages, loading } = useFetchSurveys(page, pageSize);
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

  if (openErrorTemplate) {
    <ErrorTemplate
      title="Encuestas no encontradas."
      message={errorMessage}
      buttonText="Recargar la página"
      onButtonClick={() => {
        setOpenErrorTemplate(false);
        navigate("/");
      }}
    />
  }

  return (
    <>
      <div className="App flex flex-col items-center">
        {thereAreSurveys ? (
          <>
            <div className="flex flex-wrap justify-start">
              {surveys?.map((survey, index) => (
                <div key={index} className="w-full md:w-1/2 p-2">
                  <SurveyCard survey={survey} />
                </div>
              ))}
            </div>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleSurveyPageChange}
              color="primary"
              size="large"
              className="my-5"
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