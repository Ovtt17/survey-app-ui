import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { getUserByUsername } from "../services/userService";
import { AppError } from "../types/AppError";

const useProfileUser = () => {
  const { username } = useParams<{ username: string }>();
  const { isProfileOwner, user } = useAuthContext();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [error, setError] = useState<AppError | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwner = isProfileOwner(username!);

  useEffect(() => {
    if (!isOwner) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await getUserByUsername(username!);
          setProfileUser(fetchedUser);
        } catch (error: unknown) {
          setError(error as AppError);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setProfileUser(user);
      setLoading(false);
    }
  }, [username, isOwner, user]);

  return { profileUser, isOwner, error, loading };
};

export default useProfileUser;