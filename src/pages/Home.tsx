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
  const thereAreSurveys = surveys.length > 0;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : thereAreSurveys && !openErrorTemplate ? (
        <div className="App flex flex-col items-center">
          <div className="flex flex-wrap justify-start">
            {surveys?.map((survey, index) => (
              <div key={index} className="w-full md:w-1/2 p-2">
                <SurveyCard survey={survey} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5 mb-16 md:my-0">
            <Pagination
              count={totalPages}
              page={page}
              shape="rounded"
              size='small'
              sx={{
                '& .MuiPaginationItem-root': {
                  '&.Mui-selected': {
                    backgroundColor: 'var(--tw-bg-midnight-black)',
                    color: '#FFFFFF',
                  },
                },
              }}
              onChange={handleSurveyPageChange}
            />
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
      ) : (
        <ErrorTemplate
          title="Encuestas no encontradas."
          message={errorMessage}
          buttonText="Recargar la página"
          onButtonClick={() => {
            setOpenErrorTemplate(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export default Home;