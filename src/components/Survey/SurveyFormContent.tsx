import React, { FC } from 'react';
import SurveyTitleInput from './SurveyTitleInput';
import SurveyDescriptionInput from './SurveyDescriptionInput';
import AccordionList from '../accordion/AccordionList';
import SubmitSurveyButton from './SubmitSurveyButton';
import { FieldArrayWithId } from 'react-hook-form';
import useFetchSurveyById from '../../hooks/useFetchSurveyById.ts';
import { SurveySubmission } from '../../types/survey.ts';

interface SurveyFormContentProps {
  onSubmit: (event: React.FormEvent) => void;
  questions: FieldArrayWithId<SurveySubmission, "questions", "id">[];
  addQuestion: () => void;
  removeQuestion: (index: number) => void;
  isSurveyEditable: boolean;
}

const SurveyFormContent: FC<SurveyFormContentProps> = ({ onSubmit, questions, addQuestion, removeQuestion, isSurveyEditable }) => {
  useFetchSurveyById();

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
      <SurveyTitleInput />
      <SurveyDescriptionInput />
      <AccordionList questions={questions} addQuestion={addQuestion} removeQuestion={removeQuestion} />
      <SubmitSurveyButton isEditable={isSurveyEditable} />
    </form>
  );
}

export default SurveyFormContent;