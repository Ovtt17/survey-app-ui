import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { useSurveyContext } from '../../context/SurveyContext.tsx';
import { SurveySubmission } from '../../types/survey.ts';
import { surveyDefault } from '../../data/SurveyDefault.ts';
import { QuestionType } from '../../types/questionType.ts';
import { createSurvey, updateSurvey } from '../../services/surveyService.ts';
import SuccessModal from '../modals/SuccessModal.tsx';
import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext.tsx';
import SurveyFormContent from './SurveyFormContent.tsx';

const SurveyFormContainer = () => {
    const { user } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const { isSurveyEditable } = useSurveyContext();

    const methods = useForm<SurveySubmission>({
        defaultValues: surveyDefault
    });

    const { control } = methods;

    const { fields: questions, append, remove } = useFieldArray({
        control,
        name: 'questions'
    });

    const onSubmit = async (survey: SurveySubmission) => {
        try {
            let responseMessage: string = '';
            if (survey.id && isSurveyEditable) {
                responseMessage = await updateSurvey(survey);
            } else {
                responseMessage = await createSurvey(survey);
            }
            setModalMessage(responseMessage);
            setIsModalOpen(true);
        } catch (error) {
            setIsModalOpen(false);
            console.error('Error submitting survey:', error);
        }
    };

    const addQuestion = () => {
        append({
            text: '',
            type: QuestionType.SELECCION_UNICA,
            isCorrect: false,
            options: [{ text: '', isCorrect: false }]
        });
    };

    const removeQuestion = (index: number) => {
        remove(index);
    };

    return (
        <div className='w-11/12 bg-white p-8 rounded-lg shadow-xl'>
            <FormProvider {...methods}>
                <SurveyFormContent
                    onSubmit={methods.handleSubmit(onSubmit)}
                    questions={questions}
                    addQuestion={addQuestion}
                    removeQuestion={removeQuestion}
                    isSurveyEditable={isSurveyEditable}
                />
            </FormProvider>
            <SuccessModal
                open={isModalOpen}
                title="¡Registro Exitoso!"
                message={modalMessage}
                buttonText="Ver tus Encuestas"
                buttonLink={`/${user?.username}/surveys`}
            />
        </div>
    );
}

export default SurveyFormContainer;
