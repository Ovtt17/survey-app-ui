import { FC } from 'react';
import useProfileUser from '../../hooks/useProfileUser';
import NoProfilePictureWhiteIcon from '../../assets/no-profile-picture-bg-white.svg';
import EditIcon from '@mui/icons-material/Edit';

interface ProfileAsideProps {
}

const ProfileAside: FC<ProfileAsideProps> = ({ }) => {
  const { profileUser: user, isOwner } = useProfileUser();

  return (
    <aside className="w-full md:w-1/5 md:max-w-1/3 md:pb-6">
      <div className="flex flex-col gap-6 items-center md:items-start">
        <div className="relative flex justify-center w-full max-w-xs md:max-w-sm">
          <img
            src={user?.profilePictureUrl || NoProfilePictureWhiteIcon}
            alt="profile-picture"
            className="w-full aspect-square rounded-full object-cover"
          />
          {isOwner && (
            <button
              className="absolute border bottom-0 left-0 mb-5 ml-8 md:mb-3 md:ml-4 px-2 py-0.5 bg-midnight-black text-white rounded-md hover:bg-gray-700"
              aria-label="Edit profile picture"
            >
              <EditIcon
                fontSize="small"
              />
              <span className="hidden lg:inline">Edit</span>
            </button>
          )}
        </div>
        <div className="text-center md:text-left">
          <p className="text-2xl font-bold mb-2">{user?.fullName}</p>
          <p className="text-base text-gray-500">@{user?.username}</p>
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