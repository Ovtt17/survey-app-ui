import {Question} from "./question.ts";

export interface Accordion {
    id: number;
    expanded: boolean;
    question: Question;
}