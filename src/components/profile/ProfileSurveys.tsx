import { FC } from 'react';
import useFetchSurveysByCurrentUser from '../../hooks/useFetchSurveysForOwner';
import ProfileSurveyCard from './ProfileSurveyCard';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useFetchSurveysByUsername from '../../hooks/useFetchSurveysByUsername';

interface ProfileSurveysProps {

}

const ProfileSurveys: FC<ProfileSurveysProps> = ({ }) => {
  const { username } = useParams<{ username: string }>();
  const { isProfileOwner } = useAuthContext();

  const isOwner = isProfileOwner(username!);
  const surveysHook = isOwner ? useFetchSurveysByCurrentUser() : useFetchSurveysByUsername(username as string);

  const { surveys, openErrorTemplate } = surveysHook;

  return (
    <div className="w-full md:w-2/3 p-4">
      <h2 className="text-xl font-semibold mb-4 border-b-2">Encuestas</h2>
      {surveys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {surveys.map((survey) => (
            <ProfileSurveyCard key={survey.id} survey={survey} />
          ))}
        </div>
      ) : openErrorTemplate ? (
        <div className="text-red-500">Error al cargar las encuestas.</div>
      ) : (
        <div className="text-gray-500">No tienes encuestas.</div>
      )}
    </div>
  );
}

export default ProfileSurveys;