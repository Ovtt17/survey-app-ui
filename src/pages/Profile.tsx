import { useState } from 'react';
import CreateSurveyButton from '../components/buttons/CreateSurveyButton';
import ProfileAside from '../components/profile/ProfileAside';
import ProfileSurveys from '../components/profile/ProfileSurveys';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import ErrorTemplate from '../components/error/ErrorTemplate';
import useProfileUser from '../hooks/useProfileUser';
import NotFound from '../components/error/NotFound';

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const [, setOpenErrorModal] = useState<boolean>(false);

  const { profileUser, isOwner, loading, error } = useProfileUser();

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  const handleConfirmLogin = () => {
    setOpenErrorModal(false);
    navigate("/login");
  };

  if (error) {
    return <NotFound errorMessage={error} />;
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
        <ErrorTemplate
          title='Error'
          message='Para realizar esta acción es necesario iniciar sesión'
          buttonText='Iniciar Sesión'
          onButtonClick={handleConfirmLogin}
        />
      )}
    </section>
  );
}

export default Profile;