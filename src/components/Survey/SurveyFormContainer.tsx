import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { useSurveyContext } from '../../context/SurveyContext.tsx';
import SurveyTitleInput from './SurveyTitleInput';
import SurveyDescriptionInput from './SurveyDescriptionInput';
import AccordionList from '../accordion/AccordionList';
import SubmitSurveyButton from './SubmitSurveyButton';
import { SurveySubmission } from '../../types/survey.ts';
import { surveyDefault } from '../../data/SurveyDefault.ts';
import { QuestionType } from '../../types/questionType.ts';
import { createSurvey } from '../../services/surveyService.ts';
import SuccessModal from '../modals/SuccessModal.tsx';
import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext.tsx';

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
            let response = await createSurvey(survey);
            setIsModalOpen(true);
            setModalMessage(response);
        } catch (error) {
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
                <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <SurveyTitleInput />
                    <SurveyDescriptionInput />
                    <AccordionList questions={questions} addQuestion={addQuestion} removeQuestion={removeQuestion} />
                    <SubmitSurveyButton isEditable={isSurveyEditable} />
                </form>
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
