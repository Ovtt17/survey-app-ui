import {useState} from 'react';
import {SelectChangeEvent} from '@mui/material/Select';
import {Accordion} from "../types/accordion.ts";
import {accordionListDefault} from "../data/AccordionListDefault.ts";
import {Question} from "../types/question.ts";
import {accordionTemplate} from "../data/AccordionTemplate.ts";

const useAccordionState = () => {
    const [accordions, setAccordions] = useState<Accordion[]>(accordionListDefault);

    const handleExpansion = (id: number, isExpanded: boolean) => {
        setAccordions((prevAccordions) =>
            prevAccordions.map((accordion) =>
                accordion.id === id
                    ? {...accordion, expanded: isExpanded}
                    : accordion
            )
        );
    };

    const handleInputChange = (id: number, value: string) => {
        setAccordions((prevAccordions) =>
            prevAccordions.map((accordion) =>
                accordion.id === id
                    ? {
                        ...accordion,
                        question: {
                            ...accordion.question,
                            text: value
                        }
                    }
                    : accordion
            )
        );
    };

    const handleTypeChange = (id: number, event: SelectChangeEvent<Question['type']>) => {
        const questionType = event.target.value as Question['type'];
        setAccordions((prevAccordions) =>
            prevAccordions.map((accordion) =>
                accordion.id === id
                    ? {
                        ...accordion,
                        question:
                            {
                                ...accordion.question,
                                type: questionType
                            }
                    }
                    : accordion
            )
        );
    };

    const addAccordion = () => {
        setAccordions((prevAccordions) => [
            ...prevAccordions,
            {
                ...accordionTemplate,
                id: prevAccordions.length + 1,
                question: {
                    ...accordionTemplate.question,
                    id: prevAccordions.length + 1,
                    options: accordionTemplate.question.options.map((option, index) => ({
                        ...option,
                        id: index + 1
                    }))
                }
            }
        ]);
    };

    const removeAccordion = (id: number) => {
        setAccordions((prevAccordions) =>
            prevAccordions
                .filter((accordion) => accordion.id !== id)
                .map((accordion, index) => ({...accordion, id: index + 1}))
        );
    };

    return {
        accordions,
        handleExpansion,
        handleInputChange,
        handleTypeChange,
        addAccordion,
        removeAccordion
    };
};

export default useAccordionState;