import { FC, useState } from 'react';
import useFetchSurveysByCurrentUser from '../../hooks/useFetchSurveysForOwner';
import ProfileSurveyCard from './ProfileSurveyCard';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useFetchSurveysByUsername from '../../hooks/useFetchSurveysByUsername';
import { Pagination } from '@mui/material';

interface ProfileSurveysProps {

}

const ProfileSurveys: FC<ProfileSurveysProps> = ({ }) => {
  const { username } = useParams<{ username: string }>();
  const { isProfileOwner } = useAuthContext();
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const handleSurveyPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const isOwner = isProfileOwner(username!);
  const surveysHook = isOwner ? useFetchSurveysByCurrentUser(page, pageSize) : useFetchSurveysByUsername(username as string, page, pageSize);

  const { surveys, openErrorTemplate, totalPages } = surveysHook;
  const hasSurveys = surveys.length > 0;

  return (
    <div className="w-full h-full md:w-2/3 p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 border-b-2">Encuestas</h2>
      {hasSurveys ? (
        <>
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {surveys.map((survey) => (
                <ProfileSurveyCard key={survey.id} survey={survey} />
              ))}
            </div>
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
        </>
      ) : openErrorTemplate ? (
        <div className="text-red-500">Error al cargar las encuestas.</div>
      ) : (
        <div className="text-gray-500">No tienes encuestas.</div>
      )}
    </div>
  );
}

export default ProfileSurveys;