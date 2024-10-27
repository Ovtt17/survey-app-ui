import React from 'react';
import { Link } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarRateIcon from '@mui/icons-material/StarRate';
import { SurveyResponse } from '../../types/survey';
import { useAuthContext } from '../../context/AuthContext';

interface SurveyActionsProps {
  survey: SurveyResponse;
  handleOpenErrorModal: () => void;
  handleOpenRatingModal: () => void;
}

const SurveyActions: React.FC<SurveyActionsProps> = ({ survey, handleOpenErrorModal, handleOpenRatingModal }) => {
  const { verifySession } = useAuthContext();

  return (
    <div className="pt-4 flex justify-around">
      <Link to={`/surveys/${survey.id}`} onClick={(e) => verifySession(e, handleOpenErrorModal, () => { })}>
        <button className="flex items-center text-gray-600 hover:bg-gray-200 px-3 py-2 rounded transition duration-300">
          <ChecklistRtlIcon className="mr-1" />
          <span className="hidden xl:inline xl:text-sm">Responder</span>
        </button>
      </Link>

      <Link to={`/surveys/${survey.id}/reviews`} onClick={(e) => verifySession(e, handleOpenErrorModal, () => { })}>
        <button className="flex items-center text-gray-600 hover:bg-gray-200 px-3 py-2 rounded transition duration-300">
          <ReviewsIcon className="mr-1" />
          <span className="hidden xl:inline xl:text-sm">Reseñas</span>
        </button>
      </Link>

      <button
        className="flex items-center text-gray-600 hover:bg-gray-200 px-3 py-2 rounded transition duration-300"
        onClick={(e) => verifySession(e, handleOpenErrorModal, handleOpenRatingModal)}
      >
        <StarRateIcon className="mr-1" />
        <span className="hidden xl:inline xl:text-sm">Valorar</span>
      </button>
    </div>
  );
};

export default SurveyActions;