// src/routes.tsx
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import AnswerSurvey from '../components/answer/AnswerSurvey';
import CreateSurveyForm from '../components/survey/CreateSurveyForm';
import Login from '../components/user/Login';
import UserSurveys from '../components/user/UserSurveys';
import { EditProvider } from '../context/EditSurveyContext';
import Reviews from '../components/reviews/Reviews';
import Register from '../components/user/Register';
import ActivateAccount from '../components/user/ActivateAccount';
import SurveyParticipations from '../components/survey/SurveyParticipations';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate-account" element={<ActivateAccount />} />
      <Route path='/login' element={<Login />} />
      <Route path="/surveys" element={<Home />} />
      <Route path='/surveys/create' element={
        <EditProvider>
          <CreateSurveyForm />
        </EditProvider>
      } />
      <Route path="/surveys/:id" element={<AnswerSurvey />} />
      <Route path="/:username/surveys" element={<UserSurveys />} />

      <Route path='/:username/surveys/:id/participations' element={<SurveyParticipations />} />

      <Route path="/:username/surveys/:id" element={
        <EditProvider>
          <CreateSurveyForm />
        </EditProvider>
      } />
      <Route path='/surveys/:id/reviews' element={ <Reviews /> } />
    </Routes>
  );
};

export default AppRoutes;