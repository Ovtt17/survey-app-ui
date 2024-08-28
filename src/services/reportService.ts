import { getToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL}/reports`;

const getHeaders = () => ({
  'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'Authorization': `Bearer ${getToken()}`
});

const handleDownload = async (url: string, reportTitle: string) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders()
    });

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const sanitizedTitle = reportTitle.replace(/\s+/g, '_').toLowerCase();

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${sanitizedTitle}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  } catch (error) {
    console.error('Error downloading report:', error);
    throw error;
  }
};

export const downloadReportWithSurvey = async (reportId: number, reportTitle: string, surveyId: number): Promise<void> => {
  try {
    const url = `${BASE_URL}/${reportId}/${surveyId}`;
    await handleDownload(url, reportTitle);
  } catch (error) {
    console.error("Failed to download report selected", error);
    throw error;
  }
};

export const downloadReportWhitoutSurvey = async (reportId: number, reportTitle: string): Promise<void> => {
  try {
    const url = `${BASE_URL}/${reportId}`;
    await handleDownload(url, reportTitle);
  } catch (error) {
    console.error("Failed to download report selected", error);
    throw error;
  }
}