import { FC, useEffect, useState } from 'react';
import { getSurveyById } from '../../services/surveyService';
import { RatingGroup } from '../../types/rating';
import { getRatingGroupBySurveyId } from '../../services/ratingService';
import {SurveyResponse} from '../../types/survey';
import { Rating } from '@mui/material';
import RatingBar from '../rating/RatingBar';
import '../../styles/reviews.css';

interface ReviewSummaryProps {
  surveyId: number;
}

export const ReviewSummary: FC<ReviewSummaryProps> = ({ surveyId }) => {
  const [ratings, setRatings] = useState<RatingGroup[]>([]);
  const [survey, setSurvey] = useState<SurveyResponse>();

  useEffect(() => {
    const fetchRatings = async () => {
      const fetchRatings = await getRatingGroupBySurveyId(surveyId.toString());
      setRatings(fetchRatings);
    };
    fetchRatings();
    const fetchSurveys = async () => {
      const fetchSurvey = await getSurveyById(surveyId.toString());
      setSurvey(fetchSurvey);
    };
    fetchSurveys();
  }, []);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 pb-11 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
      {/* Rating Count */}
      <div className="box flex flex-col gap-y-4 w-full ">
        {
          ratings.map((rating) => (
            <RatingBar
              key={rating.rating}
              rating={rating.rating}
              count={rating.count}
              totalRating={survey?.ratingCount || 0}
            />
          ))
        }
      </div>
      {/* Rating average */}
      <div className="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
        <h2 className="font-manrope font-bold text-5xl text-amber-400 mb-6">
          {survey?.averageRating}
        </h2>
        <div className="flex items-center justify-center gap-2 sm:gap-6 mb-4">
          <Rating
            name="read-only"
            size="large"
            value={survey?.averageRating || 0}
            readOnly
            precision={0.5}
            className='animate-rating'
          />
        </div>
        <p className="font-medium text-xl leading-8 text-gray-900 text-center">{survey?.ratingCount} Ratings</p>
      </div>
    </div>
  );
}
