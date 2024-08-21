import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AccordionDetailsContent from './AccordionDetailsContent';
import { NewQuestion } from '../../types/question';
import { SelectChangeEvent } from '@mui/material/Select';

interface AccordionState {
  id: number;
  expanded: boolean;
  question: NewQuestion;
}

interface AccordionListProps {
  accordions: AccordionState[];
  handleExpansion: (panelId: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => void;
  handleInputChange: (id: number, value: string) => void;
  handleTypeChange: (id: number, event: SelectChangeEvent<NewQuestion['type']>) => void;
  addAccordion: () => void;
  removeAccordion: (id: number) => void;
}

const AccordionList: React.FC<AccordionListProps> = ({
  accordions,
  handleExpansion,
  handleInputChange,
  handleTypeChange,
  addAccordion,
  removeAccordion,
}) => {
  return (
    <div>
      {accordions.map((accordion, index) => (
        <Accordion
          key={accordion.id}
          expanded={accordion.expanded}
          onChange={handleExpansion(accordion.id)}
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
                  removeAccordion(accordion.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <AccordionDetailsContent
              question={accordion.question}
              onTextChange={(value) => handleInputChange(accordion.id, value)}
              onTypeChange={(event) => handleTypeChange(accordion.id, event)}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={addAccordion}>
        Agregar Pregunta
      </Button>
    </div>
  );
};

export default AccordionList;