import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/reports`;

export const downloadSurveyAnswersReport = async (surveyId: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/survey-answers?surveyId=${surveyId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Authorization': `Bearer ${getToken()}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-${surveyId}-answers.xlsx`;
    a.click();
    a.remove();
  } catch (error) {
    console.error('Error downloading survey answers report:', error);
    throw error;
  }
};