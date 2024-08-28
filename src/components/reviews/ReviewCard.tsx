import { FC } from "react";
import { Review } from "../../types/review";
import { Rating } from "@mui/material";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const formattedDate = review.createdDate
    ? new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'America/New_York'
    }).format(new Date(review.createdDate))
    : 'Date not available';

  return (
    <section className="py-6 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="w-full">
          {/* ReviewCard component */}
          <div className="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
            <Rating name="read-only" size="large" value={review.rating.rating} readOnly
            />
            <h3 className="font-manrope font-semibold text-xl sm:text-2xl leading-9 text-black mb-6">{review.title}
            </h3>
            <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
              <div className="flex items-center gap-3">
                <img src="https://pagedone.io/asset/uploads/1704349572.png" alt="user image" className="w-8 h-8 rounded-full" />
                <h6 className="font-semibold text-lg leading-8 text-indigo-600 ">@{review.author}</h6>
              </div>
              <p className="font-normal text-lg leading-8 text-gray-400">{formattedDate}</p>
            </div>
            <p className="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">
              {review.content}
            </p>
          </div>
        </div>
      </div>
    </section >
  );
}

export default ReviewCard;