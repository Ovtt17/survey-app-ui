import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SurveyProvider} from '../context/SurveyContext.tsx';
import LoadingComponent from '../components/loadings/LoadingComponent';

const Home = lazy(() => import('../pages/Home'));
const AnswerSurvey = lazy(() => import('../pages/AnswerSurvey'));
const SurveyCreate = lazy(() => import('../pages/SurveyCreate'));
const Reviews = lazy(() => import('../pages/Reviews'));
const Register = lazy(() => import('../pages/Register'));
const SurveyParticipations = lazy(() => import('../components/survey/SurveyParticipations'));
const Report = lazy(() => import('../pages/Report'));
const ActivateAccount = lazy(() => import('../pages/ActivateAccount'));
const UserSurveys = lazy(() => import('../pages/UserSurveys'));
const LogIn = lazy(() => import('../pages/Login'));
const Profile = lazy(() => import('../pages/Profile'));

const ROUTES = {
  // General Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ACTIVATE_ACCOUNT: '/activate-account',

  // Profile Routes
  PROFILE: '/:username',

  // Survey Routes
  SURVEYS: '/surveys',
  CREATE_SURVEY: '/surveys/create',
  ANSWER_SURVEY: '/surveys/:id',
  EDIT_SURVEY: '/:username/surveys/:id',
  SURVEY_REVIEWS: '/surveys/:id/reviews',
  SURVEY_PARTICIPATIONS: '/:username/surveys/:id/participations',

  // User Specific Routes
  USER_SURVEYS: '/:username/surveys',
  USER_REPORTS: '/:username/reports',

  // Report Routes
  REPORTS: '/reports',
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        {/* General Routes */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<LogIn />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.ACTIVATE_ACCOUNT} element={<ActivateAccount />} />

        {/* Profile Route */}
        <Route path={ROUTES.PROFILE} element={<Profile />} />

        {/* Survey Routes */}
        <Route path={ROUTES.SURVEYS} element={<Home />} />
        <Route path={ROUTES.CREATE_SURVEY} element={
          <SurveyProvider>
            <SurveyCreate />
          </SurveyProvider>
        } />
        <Route path={ROUTES.ANSWER_SURVEY} element={<AnswerSurvey />} />
        <Route path={ROUTES.EDIT_SURVEY} element={
          <SurveyProvider>
            <SurveyCreate />
          </SurveyProvider>
        } />
        <Route path={ROUTES.SURVEY_REVIEWS} element={<Reviews />} />
        <Route path={ROUTES.SURVEY_PARTICIPATIONS} element={<SurveyParticipations />} />

        {/* User Specific Routes */}
        <Route path={ROUTES.USER_SURVEYS} element={<UserSurveys />} />
        <Route path={ROUTES.USER_REPORTS} element={<Report />} />

        {/* Report Routes */}
        <Route path={ROUTES.REPORTS} element={<Report />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;