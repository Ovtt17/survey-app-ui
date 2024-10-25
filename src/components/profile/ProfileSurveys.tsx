import { FC, useState } from 'react';
import useFetchSurveysByCurrentUser from '../../hooks/useFetchSurveysByCurrentUser';
import useFetchSurveysByUsername from '../../hooks/useFetchSurveysByUsername';
import SurveyList from '../survey/SurveyList';
import SurveysGlimmer from '../loadings/SurveysGlimmer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AnimationPaths } from '../../constants/animationPaths';

interface ProfileSurveysProps {
  isOwner: boolean;
  username: string;
}

const ProfileSurveys: FC<ProfileSurveysProps> = ({ isOwner, username }) => {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const handleSurveyPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const surveysByCurrentUser = useFetchSurveysByCurrentUser(page, pageSize);
  const surveysByUsername = useFetchSurveysByUsername(username as string, page, pageSize);

  const surveysHook = isOwner ? surveysByCurrentUser : surveysByUsername;

  const { surveys, setSurveys, totalPages, loading, error } = surveysHook;
  const hasSurveys = surveys.length > 0;

  const handleSurveyDeleted = (id: number) => {
    setSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== id));
  }

  if (loading) {
    return <SurveysGlimmer />;
  }

  return (
    <section className="w-full h-full lg:w-2/3 p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 border-b-2">Encuestas</h2>
      {hasSurveys ? (
        <>
          <SurveyList
            surveys={surveys}
            totalPages={totalPages}
            page={page}
            onPageChange={handleSurveyPageChange}
            handleSurveyDeleted={handleSurveyDeleted}
          />
        </>
      ) : (
        <div className="text-center text-gray-500">
          <div className='flex justify-center'>
            <DotLottieReact
              src={AnimationPaths.NoResultFound}
              loop
              autoplay
              className="w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[330px]"
            />
          </div>
          {isOwner && error ? error.message : 'No hay encuestas'}
        </div>
      )}
    </section>
  );
}

export default ProfileSurveys;