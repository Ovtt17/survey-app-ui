import { useState } from 'react';
import CreateSurveyButton from '../components/buttons/CreateSurveyButton';
import ProfileAside from '../components/profile/ProfileAside';
import ProfileSurveys from '../components/profile/ProfileSurveys';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import ErrorTemplate from '../components/error/ErrorTemplate';

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { isAuthenticated, isProfileOwner } = useAuthContext();

  const isOwner = isProfileOwner(username!);
  const navigate = useNavigate();
  const [, setOpenErrorModal] = useState<boolean>(false);

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  const handleConfirmLogin = () => {
    setOpenErrorModal(false);
    navigate("/login");
  };

  return (
    <section className="w-full flex flex-col justify-center md:flex-row gap-4 md:gap-0 p-2 md:p-5">
      {!isAuthenticated ? (
        <ErrorTemplate
          title='Error'
          message='Para realizar esta acción es necesario iniciar sesión'
          buttonText='Iniciar Sesión'
          onButtonClick={handleConfirmLogin}
        />
      ) : (
        <>
          <ProfileAside />
          <ProfileSurveys />
          {isOwner && <CreateSurveyButton handleOpenErrorModal={handleOpenErrorModal} />}
        </>
      )
      }

    </section>
  );
}

export default Profile;