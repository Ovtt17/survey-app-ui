import { FC } from 'react';
import { SurveySubmission } from '../../types/survey';
import SurveyCreatorInfo from '../survey/SurveyCreatorInfo';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

interface SurveyDetailsProps {
  survey: SurveySubmission;
}

const SurveyDetails: FC<SurveyDetailsProps> = ({ survey }) => {
  const surveyInfo = {
    creatorFullName: survey.creator?.fullName || '',
    creatorUsername: survey.creator?.username || '',
    creatorProfilePicture: survey.creator?.profilePictureUrl || '',
    averageRating: survey.averageRating || 0,
    ratingCount: survey.ratingCount || 0,
  }

  return (
    <>
      <SurveyCreatorInfo survey={surveyInfo} />
      <Typography variant="h4" gutterBottom>
        {survey.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {survey.description}
      </Typography>
      {survey.creationDate && (
        <Typography variant="subtitle1" gutterBottom>
          <b>Fecha de creación:</b> {dayjs(survey.creationDate).format('MMMM D, YYYY h:mm A')}
        </Typography>
      )}
    </>
  );
}

export default SurveyDetails;