import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionDetailsContent from './AccordionDetailsContent';
import { Question } from '../../types/question';
import AccordionSummaryComponent from './AccordionSummaryComponent';

interface AccordionItemProps {
    question: Question;
    index: number;
    removeQuestion: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ index, removeQuestion }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpansion = (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    return (
        <Accordion expanded={expanded} onChange={handleExpansion}>
            <AccordionSummaryComponent index={index} removeQuestion={removeQuestion} />
            <AccordionDetails>
                <AccordionDetailsContent questionIndex={index} />
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;
