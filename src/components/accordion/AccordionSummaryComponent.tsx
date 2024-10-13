import React from 'react';
import { AccordionSummary, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface AccordionSummaryComponentProps {
    index: number;
    removeQuestion: () => void;
}

const AccordionSummaryComponent: React.FC<AccordionSummaryComponentProps> = ({ index, removeQuestion }) => {
    return (
        <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
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
                    <DeleteOutlineOutlinedIcon sx={{ color: 'white' }} />
                </IconButton>
            </div>
        </AccordionSummary>
    );
};

export default AccordionSummaryComponent;