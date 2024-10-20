import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExcelIcon from '../../assets/icon-excel.svg';
import { SurveyResponse } from "../../types/survey";
import { FC } from "react";
import { useAuthContext } from "../../context/AuthContext";

interface SurveyOwnerOptionsProps {
  survey: SurveyResponse;
  onDownloadAnswersReport: () => void;
  onDelete: (id: number) => void;
}
const SurveyOwnerOptions: FC<SurveyOwnerOptionsProps> = ({
  survey,
  onDownloadAnswersReport,
  onDelete,
}) => {
  const { user } = useAuthContext();
  const isOwner = survey.creatorUsername === user?.username;
  return (
    <>
      {isOwner && (
        <div className="absolute top-2 right-1 flex space-x-2">
          <div onClick={onDownloadAnswersReport} className="cursor-pointer h-8 w-8 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
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
          <IconButton onClick={() => onDelete(survey.id)} aria-label="delete" title="Eliminar" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </>
  );
}

export default SurveyOwnerOptions;