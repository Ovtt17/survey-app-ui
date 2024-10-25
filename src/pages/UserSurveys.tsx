import { useState } from "react";
import SurveyContainer from "../components/survey/SurveyContainer";
import useFetchSurveysByUsername from "../hooks/useFetchSurveysByUsername";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const UserSurveys = () => {
  const { username } = useParams<{ username: string }>();
  const { isProfileOwner } = useAuthContext();
  const isOwner = isProfileOwner(username as string);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const {
    surveys,
    setSurveys,
    totalPages,
    loading,
    error
  } = useFetchSurveysByUsername(username as string, page, pageSize);

  const handleSurveyDeleted = (id: number) => {
    setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey.id !== id));
  }

  return (
    <SurveyContainer
      surveys={surveys}
      totalPages={totalPages}
      loading={loading}
      error={error}
      page={page}
      setPage={setPage}
      handleSurveyDeleted={handleSurveyDeleted}
    >
      <h2 className="text-2xl font-bold">{ isOwner ? 'Mis Encuestas' : `Encuestas de ${username}` }</h2>
    </SurveyContainer>
  );
}

export default UserSurveys;