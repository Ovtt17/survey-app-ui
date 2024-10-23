import { useSurveyContext } from '../context/SurveyContext.tsx';
import { useAuthContext } from '../context/AuthContext.tsx';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { SurveySubmission } from '../types/survey.ts';
import { surveyDefault } from '../data/SurveyDefault.ts';
import { createSurvey, updateSurvey } from '../services/surveyService.ts';
import SurveyFormContent from '../components/survey/form/SurveyFormContent.tsx';
import SuccessModal from '../components/modals/SuccessModal.tsx';
import ProccessingModal from '../components/modals/ProccessingModal.tsx';
import ErrorTemplate from '../components/error/ErrorTemplate.tsx';
import { useNavigate } from 'react-router-dom';

const SurveyForm = () => {
  const navigate = useNavigate();
  const { isSurveyEditable } = useSurveyContext();
  const { user, isAuthenticated } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      const responseMessage = survey.id && isSurveyEditable ? await updateSurvey(survey) : await createSurvey(survey);
      setModalMessage(responseMessage);
      setIsModalOpen(true);
    } catch (error) {
      setIsModalOpen(false);
      console.error('Error submitting survey:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addQuestion = () => {
    append(surveyDefault.questions[0]);
  };

  const removeQuestion = (index: number) => {
    remove(index);
  };

  if (!isAuthenticated) {
    return (
      <ErrorTemplate
        title="No puedes acceder."
        message="Debes iniciar sesión para crear una encuesta."
        buttonText="Iniciar Sesión"
        onButtonClick={() => {
          navigate("/login");
        }}
      />
    )
  }

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
          <ProccessingModal isLoading={isLoading} />
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

export default SurveyForm;