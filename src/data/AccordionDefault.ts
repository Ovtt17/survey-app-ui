import {QuestionType} from "../types/questionType.ts";
import {QuestionOption} from "../types/questionOption.ts";
import {Accordion} from "../types/accordion.ts";

export const AccordionDefault: Accordion[] = [
    {
        id: 1,
        expanded: false,
        question: {
            text: '',
            type: QuestionType.SELECCION_UNICA as QuestionType,
            options: [] as QuestionOption[]
        }
    }
];