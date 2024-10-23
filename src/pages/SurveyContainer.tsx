import { ReactNode, useState } from 'react';
import { SurveyResponse } from '../types/survey';
import SurveysGlimmer from '../components/loadings/SurveysGlimmer';
import SurveyList from '../components/survey/SurveyList';
import NotFound from '../components/error/NotFound';
import CreateSurveyButton from '../components/buttons/CreateSurveyButton';
import ErrorModal from '../components/error/ErrorModal';
import { useNavigate } from 'react-router-dom';

interface SurveyContainerProps {
  surveys: SurveyResponse[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  pageSize?: number;
  page: number;
  setPage: (value: number) => void;
  handleSurveyDeleted?: (id: number) => void;
  children?: ReactNode;
}

const SurveyContainer = ({
  surveys,
  totalPages,
  loading,
  error,
  page,
  setPage,
  handleSurveyDeleted,
  children,
}: SurveyContainerProps) => {
  const navigate = useNavigate();
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const thereAreSurveys = surveys.length > 0;

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  const handleSurveyPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <SurveysGlimmer />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      {children && <div className="flex flex-col items-center">{children}</div>}
      {thereAreSurveys ? (
        <SurveyList
          surveys={surveys}
          totalPages={totalPages}
          page={page}
          onPageChange={handleSurveyPageChange}
          handleSurveyDeleted={handleSurveyDeleted}
        />
      ) : (
        <NotFound errorMessage={error ?? undefined} />
      )}
      <CreateSurveyButton handleOpenErrorModal={handleOpenErrorModal} />
      <ErrorModal
        open={openErrorModal}
        setOpen={setOpenErrorModal}
        title="Error"
        message="Para realizar esta acción es necesario iniciar sesión"
        confirmText="Iniciar Sesión"
        onConfirm={() => {
          navigate('/login');
        }}
      />
    </div>
  );
};

export default SurveyContainer;