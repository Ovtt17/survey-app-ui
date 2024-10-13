import {useSurveyContext} from '../context/SurveyContext.tsx';
import { useAuthContext } from '../context/AuthContext.tsx';
import { useState } from 'react';
import { QuestionType } from '../types/questionType.ts';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { SurveySubmission } from '../types/survey.ts';
import { surveyDefault } from '../data/SurveyDefault.ts';
import { createSurvey, updateSurvey } from '../services/surveyService.ts';
import SurveyFormContent from '../components/survey/SurveyFormContent.tsx';
import SuccessModal from '../components/modals/SuccessModal.tsx';

const SurveyCreate = () => {
  const { isSurveyEditable } = useSurveyContext();
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

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
    <>
      <h2 className='flex justify-center text-3xl font-bold mb-5 mt-5'>{isSurveyEditable ? 'Editar Encuesta' : 'Crear Encuesta'}</h2>
      <div className='flex justify-center items-center'>
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
      </div>
    </>
  );
}

export default SurveyCreate;