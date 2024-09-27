import { useAuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { isProfileOwner, user } = useAuthContext();

  const isOwner = isProfileOwner(username!);

  return (
    <div>
      {isOwner ? (
        <div>
          <h1>Welcome, {user?.username}!</h1>
          <p>Here is your profile information:</p>
          <p>Username: {user?.username}</p>
        </div>
        
      ) : (
        <h1>Welcome to {username}'s profile!</h1>
      )}
    </div>
  );
}

export default Profile;