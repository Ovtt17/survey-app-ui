import { FC } from 'react';
import { Survey } from '../../types/survey';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

interface ProfileSurveyCardProps {
  survey: Survey;
}

const ProfileSurveyCard: FC<ProfileSurveyCardProps> = ({ survey }) => {
  return (
    <div className="bg-white border-2 rounded-lg p-4">
      <Link to={`/surveys/${survey.id}`} className='text-blue-800 hover:underline'>
        <h3 className="font-medium">{survey.title}</h3>
      </Link>
      <span className="text-gray-600 text-sm flex items-center">
        Rating:
        <Rating
          name="read-only ml-1"
          size="small"
          value={survey.averageRating}
          readOnly
          precision={0.5}
        />
      </span>
      <p className="text-xs font-extralight text-gray-600">{survey.description}</p>
    </div>
  );
}

export default ProfileSurveyCard;