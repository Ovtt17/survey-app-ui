import { FC } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { isProfileOwner } = useAuthContext();

  const isOwner = isProfileOwner(username!);

  return (
    <div>
      Profile
    </div>
  );
}

export default Profile;