// src/routes.tsx
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import AnswerSurvey from '../components/survey/AnswerSurvey';
import CreateSurveyForm from '../components/survey/CreateSurveyForm';
import Login from '../components/user/Login';
import UserSurveys from '../components/user/UserSurveys';
import { EditProvider } from '../context/EditSurveyContext';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={ <Login /> } />
      <Route path="/surveys" element={<Home />} />
      <Route path='/surveys/create' element={ <CreateSurveyForm /> } />
      <Route path="/surveys/:id" element={<AnswerSurvey />} />
      <Route path="/:username/surveys" element={ <UserSurveys /> } />

      <Route path="/:username/surveys/:id" element={
        <EditProvider>
          <CreateSurveyForm />
        </EditProvider>
      } />
    </Routes>
  );
};

export default AppRoutes;