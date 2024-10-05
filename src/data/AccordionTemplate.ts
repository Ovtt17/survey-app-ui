import {Accordion} from "../types/accordion.ts";
import {QuestionType} from "../types/questionType.ts";

export const accordionTemplate: Omit<Accordion, 'id'> = {
    expanded: false,
    question: {
        text: '',
        type: QuestionType.SELECCION_UNICA,
        options: []
    }
};