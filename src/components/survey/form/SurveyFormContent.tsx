import React, { FC } from 'react';
import SurveyTitleInput from './SurveyTitleInput';
import SurveyDescriptionInput from './SurveyDescriptionInput';
import AccordionList from '../../accordion/AccordionList';
import SubmitSurveyButton from './SubmitSurveyButton';
import { FieldArrayWithId } from 'react-hook-form';
import useFetchSurveyById from '../../../hooks/useFetchSurveyById.ts';
import { SurveySubmission } from '../../../types/survey.ts';
import ErrorTemplate from '../../error/ErrorTemplate.tsx';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../loadings/LoadingComponent.tsx';
import { useAuthContext } from '../../../context/AuthContext.tsx';
import ImageUpload from './ImageUpload.tsx';

interface SurveyFormContentProps {
  onSubmit: (event: React.FormEvent) => void;
  questions: FieldArrayWithId<SurveySubmission, "questions", "id">[];
  addQuestion: () => void;
  removeQuestion: (index: number) => void;
  isSurveyEditable: boolean;
}

const SurveyFormContent: FC<SurveyFormContentProps> = ({ onSubmit, questions, addQuestion, removeQuestion, isSurveyEditable }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { error, loading } = useFetchSurveyById();

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <ErrorTemplate
        error={error}
        onButtonClick={() => navigate(`/${user?.username}/surveys`)}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
      <SurveyTitleInput />
      <SurveyDescriptionInput />
      <ImageUpload />
      <AccordionList questions={questions} addQuestion={addQuestion} removeQuestion={removeQuestion} />
      <SubmitSurveyButton isEditable={isSurveyEditable} />
    </form>
  );
}

export default SurveyFormContent;