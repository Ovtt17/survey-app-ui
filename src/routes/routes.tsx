import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditProvider } from '../context/EditSurveyContext';

const Home = lazy(() => import('../pages/Home'));
const AnswerSurvey = lazy(() => import('../pages/AnswerSurvey'));
const CreateSurveyForm = lazy(() => import('../pages/CreateSurveyForm'));
const Reviews = lazy(() => import('../pages/Reviews'));
const Register = lazy(() => import('../pages/Register'));
const SurveyParticipations = lazy(() => import('../components/survey/SurveyParticipations'));
const Report = lazy(() => import('../pages/Report'));
const ActivateAccount = lazy(() => import('../pages/ActivateAccount'));
const UserSurveys = lazy(() => import('../pages/UserSurveys'));
const LoginIn = lazy(() => import('../components/sign-in/Login'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate-account" element={<ActivateAccount />} />
        <Route path='/login' element={<LoginIn />} />
        <Route path='/reports' element={<Report />} />
        <Route path="/surveys" element={<Home />} />
        <Route path='/surveys/create' element={
          <EditProvider>
            <CreateSurveyForm />
          </EditProvider>
        } />
        <Route path="/surveys/:id" element={<AnswerSurvey />} />
        <Route path="/:username/surveys" element={<UserSurveys />} />
        <Route path='/:username/reports' element={<Report />} />
        <Route path='/:username/surveys/:id/participations' element={<SurveyParticipations />} />
        <Route path="/:username/surveys/:id" element={
          <EditProvider>
            <CreateSurveyForm />
          </EditProvider>
        } />
        <Route path='/surveys/:id/reviews' element={<Reviews />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;