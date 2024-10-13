import { QuestionType } from "../types/questionType.ts";
import {SurveySubmission} from "../types/survey.ts";

export const surveyDefault: SurveySubmission = {
    title: '',
    description: '',
    questions: [
        {
            text: '',
            type: QuestionType.SELECCION_UNICA,
            isCorrect: false,
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ]
        }
    ],
};