import React, {createContext, ReactNode, useContext, useState} from 'react';
import {SurveySubmission} from '../types/survey';
import {useAuthContext} from './AuthContext';
import {useParams} from "react-router-dom";
import {surveyDefault} from "../data/SurveyDefault.ts";

interface ContextProps {
  survey: SurveySubmission;
  setSurvey: (survey: SurveySubmission) => void;
  isSurveyEditable: boolean;
}

const SurveyContext = createContext<ContextProps | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [survey, setSurvey] = useState<SurveySubmission>(surveyDefault);
  const { isProfileOwner } = useAuthContext();
  const { username } = useParams<{ id: string, username: string }>();

  const isSurveyOwner = (username: string) => {
    return isProfileOwner(username);
  }
  const isSurveyEditable = username ? isSurveyOwner(username) : false;


  return (
    <SurveyContext.Provider value={{ survey, setSurvey, isSurveyEditable }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurveyContext must be used within an SurveyProvider');
  }
  return context;
}