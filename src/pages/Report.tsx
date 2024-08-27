import { reports } from '../data/Reports';
import ReportCard from '../components/report/ReportCard';
import { useState } from 'react';
import ReportModal from '../components/report/ReportModal';
import { Report as ReportType } from '../types/report';
import SurveyModal from '../components/survey/SurveyModal';
import { Survey } from '../types/survey';
import { downloadReportSelected } from '../services/reportService';
import { getSurveys } from '../services/surveyService';
const Report = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportSelected, setReportSelected] = useState<ReportType | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [surveySelected, setSurveySelected] = useState<Survey | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = (report: ReportType) => {
    setReportSelected(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setReportSelected(null);
    setIsModalOpen(false);
    setIsConfirmed(false);
  }

  const handleConfirmDownload = () => {
    try {
      const fetchSurveys = async () => {
        const surveyResponse = await getSurveys();
        setSurveys(surveyResponse);
      }
      fetchSurveys();
      setIsConfirmed(true);
    } catch (error) {
      console.error("Failed to fetch surveys", error);
      setError("Failed to fetch surveys");
    }
  };

  const handleSurveySelected = (survey: Survey) => {
    setSurveySelected(survey);
    if (reportSelected && surveySelected && surveySelected.id)
      downloadReport(reportSelected.id, reportSelected.title, surveySelected.id);
  };

  const downloadReport = async (reportId: number, reportTitle: string, surveyId: number) => {
    try {
      await downloadReportSelected(reportId, reportTitle, surveyId);
    } catch (error) {
      console.error("Failed to download report selected", error);
      setError("Failed to download report selected");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-10">
        {reports.map((report, index) => (
          <ReportCard
            key={index}
            report={report}
            handleOpenModal={() => handleOpenModal(report)}
          />
        ))}
      </div>
      {
        isModalOpen && (
          <ReportModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            onConfirm={handleConfirmDownload}
            report={reportSelected}
          />
        )}

      {
        isConfirmed && (
          <SurveyModal
            surveys={surveys}
            handleSurveySelected={handleSurveySelected}
            handleCloseModal={handleCloseModal}
            error={error}
          />
        )
      }
    </div>
  );
}

export default Report;