import { FC } from 'react';
import { Survey } from '../../types/survey';
import { Link } from 'react-router-dom';

interface ProfileSurveyCardProps {
  survey: Survey;
}

const ProfileSurveyCard: FC<ProfileSurveyCardProps> = ({ survey }) => {
  return (
    <div className="bg-white border-2 rounded-lg px-2 py-4">
      <Link to={`/surveys/${survey.id}`} className='text-blue-800 hover:underline'>
        <h3 className="font-medium">{survey.title}</h3>
      </Link>
      <p className="text-xs font-extralight text-gray-600">{survey.description}</p>
    </div>
  );
}

export default ProfileSurveyCard;