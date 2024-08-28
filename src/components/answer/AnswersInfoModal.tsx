import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { Answer } from '../../types/answer';

interface AnswersInfoModalProps {
  answers: Answer[];
  handleCloseModal: () => void;
  error: string | null;
}

const AnswersInfoModal: FC<AnswersInfoModalProps> = ({ answers, handleCloseModal, error }) => {

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl py-4 px-5 w-[90%]">
        <div>
          <h2 className="text-2xl font-semibold pb-5">Respuestas</h2>
        </div>
        <TableContainer component={Paper} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Id Pregunta</TableCell>
                <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Pregunta</TableCell>
                <TableCell align="center" style={{ backgroundColor: '#1f2937', color: 'white', fontWeight: 'bold' }}>Respuesta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {answers.map((answer) => (
                <TableRow key={answer.id}>
                  <TableCell align="center">{answer.questionId}</TableCell>
                  <TableCell align="center">{answer.questionText}</TableCell>
                  <TableCell align="center">{answer.answerText}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
          <button type="button" className="py-2.5 px-5 text-xs bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100"
            onClick={handleCloseModal}>
            Cerrar
          </button>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}

export default AnswersInfoModal;