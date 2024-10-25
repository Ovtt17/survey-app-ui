import useFetchSurveysByCurrentUser from "../hooks/useFetchSurveysByCurrentUser";
import { useState } from "react";
import SurveyContainer from "../components/survey/SurveyContainer";

const UserSurveys = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;


  const {
    surveys,
    setSurveys,
    totalPages,
    loading,
    error
  } = useFetchSurveysByCurrentUser(page, pageSize);

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
      <h2 className="text-2xl font-bold">Mis Encuestas</h2>
    </SurveyContainer>
  );
}

export default UserSurveys;