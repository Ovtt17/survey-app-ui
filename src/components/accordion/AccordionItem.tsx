import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AccordionDetailsContent from './AccordionDetailsContent';
import {Question} from '../../types/question';
import {SelectChangeEvent} from '@mui/material/Select';

interface AccordionItemProps {
    accordion: {
        id: number;
        expanded: boolean;
        question: Question;
    };
    index: number;
    onExpansionChange: (id: number, isExpanded: boolean) => void;
    onTextChange: (id: number, value: string) => void;
    onTypeChange: (id: number, event: SelectChangeEvent<Question['type']>) => void;
    onRemove: (id: number) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
    accordion,
    index,
    onExpansionChange,
    onTextChange,
    onTypeChange,
    onRemove
}) => {
    return (
        <Accordion
            expanded={accordion.expanded}
            onChange={(_event, isExpanded) => onExpansionChange(accordion.id, isExpanded)}
            sx={{
                '& .MuiAccordion-region': { height: accordion.expanded ? 'auto' : 0 },
                '& .MuiAccordionDetails-root': { display: accordion.expanded ? 'block' : 'none' },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${accordion.id}-content`}
                id={`panel${accordion.id}-header`}
                sx={{ backgroundColor: 'lightblue' }}
            >
                <div className='flex items-center justify-between w-full'>
                    <Typography>Pregunta {index + 1}</Typography>
                    <IconButton
                        aria-label="delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(accordion.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <AccordionDetailsContent
                    question={accordion.question}
                    onTextChange={(value) => onTextChange(accordion.id, value)}
                    onTypeChange={(event) => onTypeChange(accordion.id, event)}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;