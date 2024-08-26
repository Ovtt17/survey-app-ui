import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSurveyParticipants } from "../../services/surveyService";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Participant } from "../../types/participant";
import { format } from "date-fns";
import VisibilityIcon from '@mui/icons-material/Visibility';


const SurveyParticipants = () => {
  const { id: surveyId } = useParams<{ id: string }>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [surveyTitle, setSurveyTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      if (surveyId) {
        try {
          const fetchSurveys = await getSurveyParticipants(surveyId);
          if (fetchSurveys.length > 0) {
            setSurveyTitle(fetchSurveys[0].surveyTitle);
          }
          setParticipants(fetchSurveys);
        } catch (error) {
          console.error("Failed to fetch survey details or participants", error);
        }
      }
    };
    fetchSurveyDetails();
  }, [surveyId]);

  const handleViewAnswers = () => {
    setIsModalOpen(true);
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
              <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Username</TableCell>
              <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Fecha de participacion</TableCell>
              <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((p) => (
              <TableRow key={p.id}>
                <TableCell align="center">{p.id}</TableCell>
                <TableCell align="center">{p.username}</TableCell>
                <TableCell align="center">{format(p.participatedDate, "dd-MM-yyyy HH:mm:ss")}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={handleViewAnswers} aria-label="view" size="small">
                    <VisibilityIcon fontSize="medium" color="success" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SurveyParticipants;