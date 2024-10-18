import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SurveyResponse } from "../../types/survey";
import RatingModal from '../rating/RatingModal';
import { deleteSurvey } from "../../services/surveyService";
import { createRating } from "../../services/ratingService";
import { downloadReportWithSurvey } from "../../services/reportService";
import { reports } from "../../data/Reports";
import { useAuthContext } from "../../context/AuthContext";
import ErrorModal from "../error/ErrorModal";
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarRateIcon from '@mui/icons-material/StarRate';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import imageNotAvailable from '../../assets/Image_not_available.png';
import SurveyOwnerOptions from "./SurveyOwnerOptions";
import SurveyCreatorInfo from "./SurveyCreatorInfo";

interface SurveyCardProps {
  survey: SurveyResponse;
  onDelete?: (id: number) => void;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey, onDelete }) => {
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const { verifySession, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleOpenRatingModal = () => setOpenRatingModal(true);
  const handleCloseRatingModal = () => setOpenRatingModal(false);

  const handleOpenErrorModal = () => setOpenErrorModal(true);

  const handleConfirmLogin = () => {
    setOpenErrorModal(false);
    navigate("/login");
  };

  const handleRate = async (rated: number) => {
    try {
      await createRating({ surveyId: survey.id || 0, rating: rated });
    } catch (error) {
      console.error("Failed to submit rating", error);
    }
    handleCloseRatingModal();
  };

  const handleDelete = async (id: number = 0) => {
    await deleteSurvey(id);
    if (onDelete) onDelete(id);
  }

  const downloadAnswersReport = async () => {
    if (survey.id) {
      const report = reports.find(report => report.id === 1);
      if (report) {
        await downloadReportWithSurvey(report.id, report.title, survey.id);
      }
    }
  }

  return (
    <div className="w-full pb-5 min-h-[520px]">
      <div className="max-sm:h-64 h-72 w-full bg-gray-300 flex-none bg-cover rounded-t text-center overflow-hidden">
        <figure className="w-full h-full flex justify-center items-center">
          <img
            src={survey.pictureUrl || imageNotAvailable}
            alt="Portada de la encuesta"
            className="w-full h-full object-fill"
          />
        </figure>
      </div>
      <div className="relative min-h-72 shadow-xl bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
        <SurveyOwnerOptions
          key={survey.id}
          survey={survey}
          onDownloadAnswersReport={downloadAnswersReport}
          onDelete={handleDelete}
        />
        <div className="mb-6 mt-2">
          {!isAuthenticated && (
            <p className="text-sm text-gray-600 flex items-center">
              <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Members only
            </p>
          )}
          <div className="text-gray-900 font-bold text-xl mb-2 mt-4 md:line-clamp-1">
            <p>{survey.title}</p>
          </div>
          <p className="text-gray-700 text-base line-clamp-2">
            {survey.description}
          </p>
        </div>
        <SurveyCreatorInfo survey={survey} />
        <div className="pt-4 flex justify-around">
          <Link to={`/surveys/${survey.id}`} onClick={(e) => verifySession(e, handleOpenErrorModal, () => { })}>
            <button className="flex items-center text-gray-600 hover:bg-gray-200 px-3 py-2 rounded transition duration-300">
              <ChecklistRtlIcon className="mr-1" />
              <span className="hidden md:inline md:text-base">Responder</span>
            </button>
          </Link>

          <Link to={`/surveys/${survey.id}/reviews`} onClick={(e) => verifySession(e, handleOpenErrorModal, () => { })}>
            <button className="flex items-center text-gray-600 hover:bg-gray-200 px-3 py-2 rounded transition duration-300">
              <ReviewsIcon className="mr-1" />
              <span className="hidden md:inline md:text-base">Reseñas</span>
            </button>
          </Link>

          <button
            className="flex items-center text-gray-600 hover:bg-gray-200 px-3 py-2 rounded transition duration-300"
            onClick={(e) => verifySession(e, handleOpenErrorModal, handleOpenRatingModal)}
          >
            <StarRateIcon className="mr-1" />
            <span className="hidden md:inline md:text-base">Valorar</span>
          </button>
        </div>
      </div>
      <RatingModal
        open={openRatingModal}
        onClose={handleCloseRatingModal}
        userRating={survey.averageRating}
        onRate={handleRate}
      />

      <ErrorModal
        open={openErrorModal}
        setOpen={setOpenErrorModal}
        title="Error"
        message="Para realizar esta acción es necesario iniciar sesión"
        confirmText="Iniciar Sesión"
        onConfirm={handleConfirmLogin}
      />
    </div>
  );
};

export default SurveyCard;
