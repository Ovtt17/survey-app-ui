// src/routes.tsx
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import AnswerSurvey from '../components/Survey/AnswerSurvey';
import CreateSurveyForm from '../components/Survey/CreateSurveyForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/surveys/create' element={ <CreateSurveyForm /> } />
      <Route path="/surveys/:id/answer" element={<AnswerSurvey /> } />
    </Routes>
  );
};

export default AppRoutes;