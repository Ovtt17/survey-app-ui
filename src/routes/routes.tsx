// src/routes.tsx
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import AnswerSurvey from '../components/survey/AnswerSurvey';
import CreateSurveyForm from '../components/survey/CreateSurveyForm';
import Login from '../components/user/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={ <Login /> } />
      <Route path="/surveys" element={<Home />} />
      <Route path='/surveys/create' element={ <CreateSurveyForm /> } />
      <Route path="/surveys/:id" element={<AnswerSurvey /> } />
    </Routes>
  );
};

export default AppRoutes;