import { FC } from 'react';
import { Link } from 'react-router-dom';
import NoProfilePictureBlackIcon from '../../assets/no-profile-picture-bg-black.svg';
import Rating from '@mui/material/Rating';

interface SurveyCreatorInfoProps {
  survey: {
    creatorFullName: string;
    creatorUsername: string;
    creatorProfilePicture?: string;
    averageRating: number;
    ratingCount: number;
  };
}

const SurveyCreatorInfo: FC<SurveyCreatorInfoProps> = ({ survey }) => {
  const {
    creatorFullName,
    creatorUsername,
    creatorProfilePicture,
    averageRating,
    ratingCount,
  } = survey;

  return (
    <div className="flex">
      <Link to={`/${creatorUsername}`} className="inline-block">
        <img
          src={creatorProfilePicture || NoProfilePictureBlackIcon}
          alt={`${creatorFullName}'s profile picture`}
          className="w-10 h-10 rounded-full mr-4"
        />
      </Link>
      <div className="text-sm">
        <Link to={`/${creatorUsername}`} className="inline-block">
          <p className="text-gray-900 hover:underline">{creatorFullName}</p>
        </Link>
        <div>
          <span className="text-gray-600 text-sm flex items-center">
            Rating:
            <Rating
              name="read-only"
              className="mr-1 sm:mr-2"
              size="small"
              value={averageRating}
              readOnly
              precision={0.5}
            />
            <span>({ratingCount})</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SurveyCreatorInfo;