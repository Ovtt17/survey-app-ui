import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSurveyParticipants } from "../../services/surveyService";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Participation } from "../../types/participation";
import dayjs from "dayjs";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AnswersInfoModal from "../answer/AnswersInfoModal";
import { Answer } from "../../types/answer";
import { getAnswersBySurveyIdAndUserId } from "../../services/answerService";
import NoProfilePictureBlackIcon from '../../assets/no-profile-picture-bg-black.svg';


const SurveyParticipations = () => {
  const { id: surveyId } = useParams<{ id: string }>();
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [surveyTitle, setSurveyTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      if (surveyId) {
        try {
          const fetchSurveys = await getSurveyParticipants(surveyId);
          if (fetchSurveys.length > 0) {
            setSurveyTitle(fetchSurveys[0].surveyTitle);
          }
          setParticipations(fetchSurveys);
        } catch (error) {
          console.error("Failed to fetch survey details or participants", error);
          setError("Failed to fetch survey details or participants");
        }
      }
    };
    fetchSurveyDetails();
  }, [surveyId]);

  const handleModalAnswers = async (surveyId: number, userId: number, participationId: number) => {
    const fetchAnswers = await getAnswersBySurveyIdAndUserId(surveyId, userId, participationId);
    setAnswers(fetchAnswers);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <div className="pb-5">
        <h3 className="text-xl"><b>Id de Encuesta:</b> {surveyId}</h3>
        <h4 className="text-2xl"><b>Nombre de encuesta:</b> {surveyTitle}</h4>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Id Participación</TableCell>
              <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Foto de Perfil</TableCell>
              <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Nombre de Usuario</TableCell>
              <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Fecha de participación</TableCell>
              <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participations.map((p) => (
              <TableRow key={p.id}>
                <TableCell align="center">{p.id}</TableCell>
                <TableCell align="center"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={p.profilePictureUrl ? p.profilePictureUrl : NoProfilePictureBlackIcon}
                    alt="profile_picture"
                    className="h-10 w-10 rounded-full"
                  />
                </TableCell>
                <TableCell align="center">{p.username}</TableCell>
                <TableCell align="center">{dayjs(p.participatedDate).format("DD-MM-YYYY HH:mm:ss")}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleModalAnswers(p.surveyId, p.userId, p.id)} aria-label="view" size="small">
                    <VisibilityIcon fontSize="medium" color="success" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <AnswersInfoModal answers={answers} handleCloseModal={handleCloseModal} error={error} />
      )}
    </div>
  );
}

export default SurveyParticipations;