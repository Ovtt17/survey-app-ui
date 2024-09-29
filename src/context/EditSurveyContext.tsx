import React, { createContext, useContext, useState, ReactNode } from 'react';
import {SurveySubmission} from '../types/survey';
import { useAuthContext } from './AuthContext';

interface EditContextProps {
  survey: SurveySubmission | null;
  setSurvey: (survey: SurveySubmission | null) => void;
  isSurveyOwner: (username: string) => boolean;
}

const EditSurveyContext = createContext<EditContextProps | undefined>(undefined);

export const EditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [survey, setSurvey] = useState<SurveySubmission | null>(null);
  const { isProfileOwner } = useAuthContext();

  const isSurveyOwner = (username: string) => {
    return isProfileOwner(username);
  }

  return (
    <EditSurveyContext.Provider value={{ survey, setSurvey, isSurveyOwner }}>
      {children}
    </EditSurveyContext.Provider>
  );
};

export const useEditSurveyContext = () => {
  const context = useContext(EditSurveyContext);
  if (!context) {
    throw new Error('useEditContext must be used within an EditProvider');
  }
  return context;
}