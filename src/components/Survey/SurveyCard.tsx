import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Survey } from "../../types/survey";
import RatingModal from './RatingModal';
import Rating from '@mui/material/Rating';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface SurveyCardProps {
  survey: Survey;
  isOwner?: boolean;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey, isOwner }) => {
  const [openRatingModal, setOpenRatingModal] = React.useState(false);
  const [userRating, setUserRating] = React.useState(survey.rating);

  const handleOpen = () => setOpenRatingModal(true);
  const handleClose = () => setOpenRatingModal(false);

  const handleRate = (rating: number) => {
    setUserRating(rating);
  };

  const handleDelete = (id?: number) => {
    console.log('Deleting survey with id:', id);
  }

  const creatorFullName = `${survey.creator?.firstName} ${survey.creator?.lastName}`;

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-5">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfDB8fDB8fHww')" }}
        title="Woman holding a mug"
      >
      </div>
      <div className="relative h-72 shadow-xl bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        {isOwner && (
          <div className="absolute top-2 right-1 flex space-x-2">
            <Link to={`/${survey.creator?.username}/surveys/${survey.id}`}>
              <IconButton aria-label="edit" size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
            <IconButton onClick={() => handleDelete(survey.id)} aria-label="delete" size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        )}
        <div className="mb-6 mt-2">
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">{survey.title}</div>
          <p className="text-gray-700 text-base overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
            {survey.description}
          </p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt={`Avatar of ${survey.creator}`} />
          <div className="text-sm">
            <p className="text-gray-900">{creatorFullName}</p>
            <div>
              <span className="text-gray-600 flex items-center">
                Rating:
                <Rating
                  name="read-only ml-1"
                  size="small"
                  value={survey.rating}
                  readOnly
                  precision={0.5}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Link to={`/surveys/${survey.id}`}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '0 8px', textTransform: 'none', width: '150px', padding: '10px 0' }}
            >
              Responder Encuesta
            </Button>
          </Link>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: '0 8px', textTransform: 'none', width: '150px', padding: '10px 0' }}
          >
            Ver Reseñas
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleOpen}
            style={{ margin: '0 8px', textTransform: 'none', width: '150px', padding: '10px 0' }}
          >
            Valorar
          </Button>
        </div>
      </div>
      <RatingModal
        open={openRatingModal}
        onClose={handleClose}
        userRating={userRating}
        onRate={handleRate}
      />
    </div>
  );
};

export default SurveyCard;
