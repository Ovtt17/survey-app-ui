import React from 'react';
import Button from '@mui/material/Button';
import AccordionItem from './AccordionItem';
import useAccordionState from "../../hooks/useAccordionState.ts";

const AccordionList: React.FC = () => {
    const {
        accordions,
        handleExpansion,
        handleInputChange,
        handleTypeChange,
        addAccordion,
        removeAccordion
    } = useAccordionState();

    return (
        <div>
            {accordions.map((accordion, index) => (
                <AccordionItem
                    key={accordion.id}
                    accordion={accordion}
                    index={index}
                    onExpansionChange={handleExpansion}
                    onTextChange={handleInputChange}
                    onTypeChange={handleTypeChange}
                    onRemove={removeAccordion}
                />
            ))}
            <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={addAccordion}
            >
                Agregar Pregunta
            </Button>
        </div>
    );
};

export default AccordionList;