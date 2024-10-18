import { FC } from 'react';
import { SurveyResponse } from '../../types/survey';
import { Link } from 'react-router-dom';
import NoProfilePictureBlackIcon from '../../assets/no-profile-picture-bg-black.svg';
import { Rating } from '@mui/material';
interface SurveyCreatorInfoProps {
  survey: SurveyResponse;
}

const SurveyCreatorInfo: FC<SurveyCreatorInfoProps> = ({ survey }) => {
  return (
    <div className="flex">
      <Link to={`/${survey.creatorUsername}`} className="inline-block">
        <img
          src={survey?.creatorProfilePicture || NoProfilePictureBlackIcon}
          alt={`${survey.creatorFullName}'s profile picture`}
          className="w-10 h-10 rounded-full mr-4"
        />
      </Link>
      <div className="text-sm">
        <Link to={`/${survey.creatorUsername}`} className="inline-block">
          <p className="text-gray-900 hover:underline">{survey.creatorFullName}</p>
        </Link>
        <div>
          <span className="text-gray-600 text-sm flex items-center">
            Rating:
            <Rating
              name="read-only"
              className="mr-1 sm:mr-2"
              size="small"
              value={survey.averageRating}
              readOnly
              precision={0.5}
            />
            <span>({survey.ratingCount})</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SurveyCreatorInfo;