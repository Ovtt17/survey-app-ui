import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Survey } from '../types/survey';

interface EditContextProps {
  isEditable: boolean;
  setIsEditable: (isEditable: boolean) => void;
  survey: Survey | null;
  setSurvey: (survey: Survey | null) => void;
}

const EditSurveyContext = createContext<EditContextProps | undefined>(undefined);

export const EditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [survey, setSurvey] = useState<Survey | null>(null);

  return (
    <EditSurveyContext.Provider value={{ isEditable, setIsEditable, survey, setSurvey }}>
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