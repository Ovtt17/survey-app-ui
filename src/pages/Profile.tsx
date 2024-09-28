import ProfileAside from '../components/profile/ProfileAside';
import ProfileSurveys from '../components/profile/ProfileSurveys';

const Profile = () => {
  return (
    <section className="w-full flex flex-col justify-center md:flex-row gap-4 md:gap-0 p-2 md:p-5">
      <ProfileAside />
      <ProfileSurveys />
    </section>
  );
}

export default Profile;