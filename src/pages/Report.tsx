import { reports } from '../data/Reports';
import ReportCard from '../components/report/ReportCard';
import { useState } from 'react';
import ReportModal from '../components/report/ReportModal';
import { Report as ReportType } from '../types/report';
const Report = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);

  const handleOpenModal = (report: ReportType) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleConfirmDownload = () => {
    if (selectedReport) downloadReport(selectedReport.id);
  };

  const downloadReport = (reportId: number) => {
    
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
            report={selectedReport}
          />
        )}
    </div>
  );
}

export default Report;