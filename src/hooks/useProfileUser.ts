import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { getUserByUsername } from "../services/userService";

const useProfileUser = () => {
  const { username } = useParams<{ username: string }>();
  const { isProfileOwner, user } = useAuthContext();
  const [profileUser, setProfileUser] = useState<User | null>(null);

  const isOwner = isProfileOwner(username!);

  useEffect(() => {
    if (!isOwner) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await getUserByUsername(username!);
          setProfileUser(fetchedUser);
        } catch (error) {
          console.error(`Error fetching data for user ${username}:`, error);
        }
      };
      fetchUser();
    } else {
      setProfileUser(user);
    }
  }, [username]);

  return { profileUser, isOwner };
};

export default useProfileUser;