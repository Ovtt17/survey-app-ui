import { FC } from 'react';
import {SurveyResponse} from '../../types/survey';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import imageNotAvailable from '../../assets/Image_not_available.png';
interface ProfileSurveyCardProps {
  survey: SurveyResponse;
}

const ProfileSurveyCard: FC<ProfileSurveyCardProps> = ({ survey }) => {
  return (
    <article className="bg-white border-2 rounded-lg">
      <Link to={`/surveys/${survey.id}`}>
      <figure className="max-md:h-32 h-36 flex-none rounded-t overflow-hidden">
        <img
          src={survey.pictureUrl || imageNotAvailable}
          alt={`Portada de la encuesta ${survey.title}`}
          className="w-full h-full object-cover"
        />
      </figure>
      </Link>
      <section className="p-4">
        <Link to={`/surveys/${survey.id}`} className="text-blue-800 hover:underline">
          <h3 className="font-medium">{survey.title}</h3>
        </Link>
        <span className="text-gray-600 text-sm flex items-center">
          Rating:
          <Rating
            name="read-only"
            className="mr-2"
            size="small"
            value={survey.averageRating}
            readOnly
            precision={0.5}
          />
          <span>({survey.ratingCount})</span>
        </span>
        <p className="text-xs font-extralight text-gray-600">{survey.description}</p>
      </section>
    </article>
  );
}

export default ProfileSurveyCard;
