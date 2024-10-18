import { useAuthContext } from "../context/AuthContext";
import SurveyCard from "../components/survey/SurveyCard";
import ErrorTemplate from "../components/error/ErrorTemplate";
import { useNavigate } from "react-router-dom";
import useFetchSurveysByCurrentUser from "../hooks/useFetchSurveysByCurrentUser";
import { useState } from "react";
import { Pagination } from "@mui/material";
import LoadingComponent from "../components/loadings/LoadingComponent";
import CreateSurveyButton from "../components/buttons/CreateSurveyButton";
import ErrorModal from "../components/error/ErrorModal";

const UserSurveys = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
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
    errorMessage,
    openErrorTemplate,
    setOpenErrorTemplate,
    totalPages,
    loading
  } = useFetchSurveysByCurrentUser(page, pageSize);

  const handleSurveyDeleted = (id: number) => {
    setSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== id));
  }

  const hasSurveys = surveys.length > 0;

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Mis Encuestas</h2>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : hasSurveys && !openErrorTemplate ? (
        <div>
          <div className="flex flex-wrap justify-start">
            {surveys?.map((survey, index) => {
              const isOwner = survey.creatorUsername === user?.username;
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