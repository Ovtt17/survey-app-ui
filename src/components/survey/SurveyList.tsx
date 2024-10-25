import { FC } from 'react';
import { Pagination } from '@mui/material';
import SurveyCard from './SurveyCard';
import { SurveyResponse } from '../../types/survey';

interface SurveyListProps {
  surveys: SurveyResponse[];
  totalPages: number;
  page: number;
  onPageChange: (_event: React.ChangeEvent<unknown>, value: number) => void;
  handleSurveyDeleted?: (id: number) => void;
}

const SurveyList: FC<SurveyListProps> = ({
  surveys,
  totalPages,
  page,
  onPageChange,
  handleSurveyDeleted,
}) => {
  return (
    <>
      <div className="w-full lg:w-4/5 p-4 flex flex-wrap justify-start">
        {surveys.map(survey => (
          <SurveyCard
            key={survey.id}
            survey={survey}
            allowOwnerOptions={!!handleSurveyDeleted}
            onDelete={handleSurveyDeleted}
          />
        ))}
      </div>
      <div className="flex justify-center mt-5 mb-16 md:my-0">
        <Pagination
          count={totalPages}
          page={page}
          shape="rounded"
          size='small'
          sx={{
            '& .MuiPaginationItem-root': {
              '&.Mui-selected': {
                backgroundColor: 'var(--tw-bg-midnight-black)',
                color: '#FFFFFF',
              },
            },
          }}
          onChange={onPageChange}
        />
      </div>
    </>
  );
};

export default SurveyList;