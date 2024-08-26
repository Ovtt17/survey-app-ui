import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSurveyParticipants } from "../../services/surveyService";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Participant } from "../../types/participant";

const SurveyParticipants = () => {
  const { id: surveyId } = useParams<{ id: string }>();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    try {
      const fetchParticipants = async () => {
        if (surveyId) {
          const fetchSurveys = await getSurveyParticipants(surveyId);
          setParticipants(fetchSurveys);
        }
      };
      fetchParticipants();
    } catch (error) {
      console.error("Failed to fetch survey participants", error);
    }
  }, [surveyId]);
  return (
    <div>
      <h3>Survey ID: {surveyId}</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Fecha de participacion</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.username}</TableCell>
                <TableCell>{participant.participatedDate.toString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">Ver</Button>
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