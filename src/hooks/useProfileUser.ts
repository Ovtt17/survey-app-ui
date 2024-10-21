import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { getUserByUsername } from "../services/userService";

const useProfileUser = () => {
  const { username } = useParams<{ username: string }>();
  const { isProfileOwner, user } = useAuthContext();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwner = isProfileOwner(username!);

  useEffect(() => {
    if (!isOwner) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await getUserByUsername(username!);
          setProfileUser(fetchedUser);
        } catch (error: any) {
          console.error(error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setProfileUser(user);
      setLoading(false);
    }
  }, [username]);

  return { profileUser, isOwner, error, loading };
};

export default useProfileUser;