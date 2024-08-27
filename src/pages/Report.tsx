import { reports } from '../data/Reports';
import ReportCard from '../components/report/ReportCard';
import { useState } from 'react';
import ReportModal from '../components/report/ReportModal';
const Report = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-10">
        {reports.map((report, index) => (
          <ReportCard key={index} report={report} handleOpenModal={handleOpenModal}/>
        ))}
      </div>
      {
        isModalOpen && (
          <ReportModal open={isModalOpen} setOpen={setIsModalOpen}/>
        )}
    </div>
  );
}

export default Report;