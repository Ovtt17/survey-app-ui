import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {SurveyResponse} from "../../types/survey";
import RatingModal from '../rating/RatingModal';
import Rating from '@mui/material/Rating';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSurvey } from "../../services/surveyService";
import { createRating } from "../../services/ratingService";
import ExcelIcon from '../../assets/icon-excel.svg';
import { downloadReportWithSurvey } from "../../services/reportService";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { reports } from "../../data/Reports";
import { useAuthContext } from "../../context/AuthContext";
import ErrorModal from "../error/ErrorModal";
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarRateIcon from '@mui/icons-material/StarRate';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

interface SurveyCardProps {
  survey: SurveyResponse;
  isOwner?: boolean;
  onDelete?: (id: number) => void;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey, isOwner, onDelete }) => {
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
      <div className=" max-md:h-48 h-52 flex-none bg-cover rounded-t text-center overflow-hidden"
        style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfDB8fDB8fHww')" }}
        title="Portada de la encuesta"
      >
      </div>
      <div className="relative min-h-72 shadow-xl bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
        {isOwner && (
          <div className="absolute top-2 right-1 flex space-x-2">
            <div onClick={downloadAnswersReport} className="cursor-pointer h-8 w-8 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{ backgroundImage: `url(${ExcelIcon})` }}
              title="Exportar a Excel"
            >
            </div>
            <Link title="Ver Respuestas" to={`/${survey.creatorUsername}/surveys/${survey.id}/participations`}>
              <IconButton aria-label="view" size="small">
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Link>
            <Link title="Editar" to={`/${survey.creatorUsername}/surveys/${survey.id}`}>
              <IconButton aria-label="edit" size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
            <IconButton onClick={() => handleDelete(survey.id)} aria-label="delete" title="Eliminar" size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        )}
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
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt={`Avatar of ${survey.creatorFullName}`} />
          <div className="text-sm">
            <p className="text-gray-900">{survey.creatorFullName}</p>
            <div>
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
            </div>
          </div>
        </div>
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
