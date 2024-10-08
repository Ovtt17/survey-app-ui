import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'; import AccordionDetailsContent from './AccordionDetailsContent';
import { Question } from '../../types/question';

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
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white'}}/>}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{ backgroundColor: 'black', color: 'white' }}
            >
                <div className='flex items-center justify-between w-full'>
                    <Typography>Pregunta {index + 1}</Typography>
                    <IconButton
                        aria-label="delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeQuestion();
                        }}
                    >
                        <DeleteOutlineOutlinedIcon sx={{color: 'white'}}  />
                    </IconButton>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <AccordionDetailsContent questionIndex={index} />
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;
