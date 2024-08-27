import { FC } from 'react';

interface ReportCardProps {
  
}

const ReportCard: FC<ReportCardProps> = ({  }) => {
  return (
    <div
      className="flex flex-col cursor-pointer rounded-lg bg-gray-800
                  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                  md:max-w-xl md:flex-row">
      <div className="flex flex-col justify-start p-6">
        <h5
          className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
          Card title
        </h5>
        <span className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </span>
      </div>
    </div>
  );
}

export default ReportCard;