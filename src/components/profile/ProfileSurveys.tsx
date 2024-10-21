import { useState } from 'react';
import useFetchSurveysByCurrentUser from '../../hooks/useFetchSurveysByCurrentUser';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useFetchSurveysByUsername from '../../hooks/useFetchSurveysByUsername';
import SurveyList from '../survey/SurveyList';

const ProfileSurveys = () => {
  const { username } = useParams<{ username: string }>();
  const { isProfileOwner } = useAuthContext();
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const handleSurveyPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const isOwner = isProfileOwner(username!);
  const surveysHook = isOwner ? useFetchSurveysByCurrentUser(page, pageSize) : useFetchSurveysByUsername(username as string, page, pageSize);

  const { surveys, setSurveys, openErrorTemplate, totalPages } = surveysHook;
  const hasSurveys = surveys.length > 0;

  const handleSurveyDeleted = (id: number) => {
    setSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== id));
  }

  return (
    <div className="w-full h-full lg:w-2/3 p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 border-b-2">Encuestas</h2>
      {hasSurveys ? (
        <>
          <SurveyList
            surveys={surveys}
            totalPages={totalPages}
            page={page}
            onPageChange={handleSurveyPageChange}
            handleSurveyDeleted={handleSurveyDeleted}
          />
        </>
      ) : openErrorTemplate ? (
        <div className="text-red-500">Error al cargar las encuestas.</div>
      ) : (
        <div className="text-gray-500">{isOwner ? 'No tienes encuestas.' : 'No hay encuestas'}</div>
      )}
    </div>
  );
}

export default ProfileSurveys;