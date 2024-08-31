import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import AnswerSurvey from '../pages/AnswerSurvey';
import CreateSurveyForm from '../pages/CreateSurveyForm';
import Login from '../components/user/Login';
import { EditProvider } from '../context/EditSurveyContext';
import Reviews from '../pages/Reviews';
import Register from '../pages/Register';
import SurveyParticipations from '../components/survey/SurveyParticipations';
import Report from '../pages/Report';
import ActivateAccount from '../pages/ActivateAccount';
import UserSurveys from '../pages/UserSurveys';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate-account" element={<ActivateAccount />} />
      <Route path='/login' element={<Login />} />
      <Route path='/reports' element={<Report />} />
      <Route path="/surveys" element={<Home />} />
      <Route path='/surveys/create' element={
        <EditProvider>
          <CreateSurveyForm />
        </EditProvider>
      } />
      <Route path="/surveys/:id" element={<AnswerSurvey />} />
      <Route path="/:username/surveys" element={<UserSurveys />} />
      <Route path='/:username/reports' element={ <Report /> } />
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