import React from 'react';
import Button from '@mui/material/Button';
import AccordionItem from './AccordionItem';
import { SurveySubmission } from '../../types/survey';

interface AccordionListProps {
    questions: SurveySubmission['questions'];
    addQuestion: () => void;
    removeQuestion: (index: number) => void;
}

const AccordionList: React.FC<AccordionListProps> = ({ questions, addQuestion, removeQuestion }) => {

    return (
        <div>
            {questions.map((question, index) => (
                <AccordionItem
                    key={question.id}
                    question={question}
                    index={index}
                    removeQuestion={() => removeQuestion(index)}
                />
            ))}
            <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={addQuestion}
            >
                Agregar Pregunta
            </Button>
        </div>
    );
};

export default AccordionList;
