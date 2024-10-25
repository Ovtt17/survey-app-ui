import { useState } from 'react';
import CreateSurveyButton from '../components/buttons/CreateSurveyButton';
import ProfileAside from '../components/profile/ProfileAside';
import ProfileSurveys from '../components/profile/ProfileSurveys';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import ErrorTemplate from '../components/error/ErrorTemplate';
import useProfileUser from '../hooks/useProfileUser';
import LoginErrorTemplate from '../components/error/LoginErrorTemplate';

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const [, setOpenErrorModal] = useState<boolean>(false);

  const { profileUser, isOwner, loading, error } = useProfileUser();

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  if (error) {
    return (
      <ErrorTemplate
        error={error}
        onButtonClick={() => navigate('/')}
      />
    );
  }

  return (
    <section className="w-full h-full flex flex-col justify-center lg:flex-row gap-4 lg:gap-0 p-2 lg:p-5">
      {isAuthenticated ? (
        <>
          <ProfileAside
            profileUser={profileUser}
            isOwner={isOwner}
            loading={loading}
          />
          <ProfileSurveys
            isOwner={isOwner}
            username={profileUser?.username as string}
          />
          {isOwner && <CreateSurveyButton handleOpenErrorModal={handleOpenErrorModal} />}
        </>
      ) : (
        <LoginErrorTemplate />
      )}
    </section>
  );
}

export default Profile;