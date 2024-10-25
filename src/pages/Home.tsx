import { useState } from "react";
import useFetchSurveys from "../hooks/useFetchSurveys";
import SurveyContainer from "../components/survey/SurveyContainer";

const Home = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const {
    surveys,
    error,
    totalPages,
    loading
  } = useFetchSurveys(page, pageSize);

  return (
    <SurveyContainer
      surveys={surveys}
      totalPages={totalPages}
      loading={loading}
      error={error}
      page={page}
      setPage={setPage}
    />
  );
};

export default Home;