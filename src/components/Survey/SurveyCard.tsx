import React from "react";
import Button from '@mui/material/Button';
import { Modal, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Survey } from "../../types/survey";

interface SurveyCardProps {
  survey: Survey;
  onAnswerSurvey: () => void;
  onViewReviews: () => void;
  onRateSurvey: () => void;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey, onAnswerSurvey, onViewReviews, onRateSurvey }) => {
  const [openRatingModel, setOpenRatingModel] = React.useState(false);
  const [userRating, setUserRating] = React.useState(survey.rating);

  const handleOpen = () => setOpenRatingModel(true);
  const handleClose = () => setOpenRatingModel(false);
  
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-5">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfDB8fDB8fHww')" }}
        title="Woman holding a mug"
      >
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">{survey.title}</div>
          <p className="text-gray-700 text-base">{survey.description}</p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt={`Avatar of ${survey.author}`} />
          <div className="text-sm">
            <p className="text-gray-900">{survey.author}</p>
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
          <Link to={`/surveys/${survey.id}/answer`}>
            <Button
              variant="contained"
              color="primary"
              onClick={onAnswerSurvey}
              style={{ margin: '0 8px', textTransform: 'none', width: '150px', padding: '10px 0' }}
            >
              Responder Encuesta
            </Button>
          </Link>
          <Button
            variant="contained"
            color="secondary"
            onClick={onViewReviews}
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
      <Modal
        open={openRatingModel}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black shadow-24 p-10">
          <Typography id="modal-title" variant="h6" component="h2">
            Valorar
          </Typography>
          <Rating
            name="user-rating"
            value={userRating}
            onChange={(_, newValue) => {
              setUserRating(newValue || 2.5);
            }}
            precision={0.5}
          />
          <div className="mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onRateSurvey();
                handleClose();
              }}
            >
              Guardar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SurveyCard;