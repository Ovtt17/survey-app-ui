import { reports } from '../data/Reports';
import ReportCard from '../components/report/ReportCard';
import { useState } from 'react';
import ReportModal from '../components/report/ReportModal';
import { Report as ReportType } from '../types/report';
import SurveyModal from '../components/survey/SurveyModal';
import {SurveySubmission} from '../types/survey';
import { downloadReportWhitoutSurvey, downloadReportWithSurvey } from '../services/reportService';
import { getCurrentUserSurveys } from '../services/surveyService';
import ErrorModal from '../components/error/ErrorModal';
import { useNavigate } from 'react-router-dom';
const Report = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportSelected, setReportSelected] = useState<ReportType | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<SurveySubmission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  const handleConfirmLogin = () => {
    setOpenErrorModal(false);
    navigate("/login");
  };

  const handleOpenModal = (report: ReportType) => {
    setReportSelected(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setReportSelected(null);
    setIsModalOpen(false);
    setIsConfirmed(false);
    setError(null);
  }

  const handleConfirmDownload = async () => {
    try {
      if (reportSelected?.requiresSurvey) {
        const surveyResponse = await getCurrentUserSurveys();
        setSurveys(surveyResponse);
        setIsConfirmed(true);
      } else{
        if (reportSelected) {
          downloadReport(reportSelected.id, reportSelected.title);
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error during report download process", error);
      setError("An error occurred while processing your request. Please try again.");
    }
  };

  const handleSurveySelected = (survey: SurveySubmission) => {
    if (reportSelected && survey.id) {
      downloadReportBySurvey(reportSelected.id, reportSelected.title, survey.id);
    }
  };

  const downloadReportBySurvey = async (reportId: number, reportTitle: string, surveyId: number) => {
    try {
      await downloadReportWithSurvey(reportId, reportTitle, surveyId);
    } catch (error) {
      console.error("Failed to download report selected", error);
      setError("Failed to download report selected");
    }
  };

  const downloadReport = async (reportId: number, reportTitle: string) => {
    try {
      await downloadReportWhitoutSurvey(reportId, reportTitle);
    } catch (error) {
      console.error("Failed to download report selected", error);
      setError("Failed to download report selected");
    }
  }

  return (
    <div className="flex flex-col items-center p-10">
      <div className="flex flex-wrap justify-center gap-10">
        {reports.map((report, index) => (
          <ReportCard
            key={index}
            report={report}
            handleOpenModal={() => handleOpenModal(report)}
            handleOpenErrorModal={handleOpenErrorModal}
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

      <ErrorModal
        open={openErrorModal}
        setOpen={setOpenErrorModal}
        title="Error"
        message="Para realizar esta acción es necesario iniciar sesión"
        confirmText="Iniciar Sesión"
        onConfirm={handleConfirmLogin}
      />
    </div>
  );
}

export default Report;