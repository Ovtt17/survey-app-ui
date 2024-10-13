import {useSurveyContext} from '../context/SurveyContext.tsx';
import SurveyFormContainer from '../components/survey/SurveyFormContainer';

const SurveyCreate = () => {
    const { isSurveyEditable }  = useSurveyContext();

  return (
    <>
      <h2 className='flex justify-center text-3xl font-bold mb-5 mt-5'>{isSurveyEditable ? 'Editar Encuesta' : 'Crear Encuesta'}</h2>
      <div className='flex justify-center items-center'>
        <SurveyFormContainer />
      </div>
    </>
  );
}

export default SurveyCreate;