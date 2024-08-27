import { FC } from 'react';
import { Report } from '../../types/report';

interface ReportCardProps {
  report: Report;
  handleOpenModal: () => void;
}

const ReportCard: FC<ReportCardProps> = ({ report, handleOpenModal }) => {
  return (
    <div
      onClick={handleOpenModal}
      className="flex flex-col cursor-pointer rounded-lg bg-gray-800
                  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                  md:max-w-xl md:flex-row
                  hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out">
      <div className="flex flex-col justify-start p-6">
        <h5
          className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
          {report.title}
        </h5>
        <span className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {report.description}
        </span>
      </div>
    </div>
  );
}

export default ReportCard;