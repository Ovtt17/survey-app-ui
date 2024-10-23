import { FC, useEffect, useState } from 'react';
import NoProfilePictureWhiteIcon from '../../assets/no-profile-picture-bg-white.svg';
import EditProfilePictureDropDown from './EditProfilePictureDropDown';
import { useAuthContext } from '../../context/AuthContext';
import { ProfileInfoGlimmer } from '../loadings/ProfileInfoGlimmer';
import { User } from '../../types/user';

interface ProfileAsideProps {
  profileUser: User | null;
  isOwner: boolean;
  loading: boolean;
}

const ProfileAside: FC<ProfileAsideProps> = ({profileUser, isOwner, loading}) => {
  const { changeUser } = useAuthContext();
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>(profileUser?.profilePictureUrl);

  useEffect(() => {
    setProfilePictureUrl(profileUser?.profilePictureUrl);
  }, [profileUser?.profilePictureUrl]);

  const handleProfilePictureChange = (newProfilePicture: string) => {
    setProfilePictureUrl(newProfilePicture);
    if (profileUser) {
      const updatedUser = { ...profileUser, profilePictureUrl: newProfilePicture };
      changeUser(updatedUser);
    }
  };

  if (loading) {
    return <ProfileInfoGlimmer />
  }

  return (
    <aside className="w-full lg:w-1/5 lg:max-w-1/3 lg:pb-6">
      <div className="flex flex-col gap-6 items-center lg:items-start">
        <div className="relative flex justify-center w-full max-w-xs lg:max-w-sm">
          <img
            src={profilePictureUrl || NoProfilePictureWhiteIcon}
            alt="profile-picture"
            className="w-full aspect-square rounded-full object-cover"
          />
          {isOwner && <EditProfilePictureDropDown
            profilePicture={profilePictureUrl}
            handleProfilePictureChange={handleProfilePictureChange}
          />
          }
        </div>
        <div className="text-center lg:text-left">
          <p className="text-2xl font-bold mb-2">{profileUser?.fullName}</p>
          <p className="text-base text-gray-500">@{profileUser?.username}</p>
        </div>
        {
          isOwner && (
            <div className='w-full'>
              <button className="flex w-full justify-center rounded-md bg-midnight-black hover:bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                Editar Perfil
              </button>
            </div>
          )
        }
      </div>
    </aside>
  );
}

export default ProfileAside;