import { FC } from 'react';
import { Survey } from '../../types/survey';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

interface ProfileSurveyCardProps {
  survey: Survey;
}

const ProfileSurveyCard: FC<ProfileSurveyCardProps> = ({ survey }) => {
  return (
    <article className="bg-white border-2 rounded-lg">
      <figure className="max-md:h-32 h-36 flex-none rounded-t overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfDB8fDB8fHww"
          alt={`Portada de la encuesta ${survey.title}`}
          className="w-full h-full object-cover"
        />
      </figure>
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
