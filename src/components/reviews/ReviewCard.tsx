import { FC } from "react";
import { Review } from "../../types/review";
import { Rating } from "@mui/material";
import '../../styles/reviews.css'
import NoProfilePictureBlackIcon from '../../assets/no-profile-picture-bg-black.svg';
import { Link } from "react-router-dom";

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
    <section className="my-8 py-4 relative bg-white shadow-lg rounded-lg">
      <div className="w-full max-w-4xl px-6 md:px-8 lg:px-10 mx-auto">
        <div className="w-full">
          {/* ReviewCard component */}
          <div className="pt-8 pb-6 border-b border-gray-200">
            <Rating name="read-only" size="large" value={review.rating.rating} readOnly className="animate-rating mb-4" />
            <h3 className="font-manrope font-semibold text-2xl sm:text-3xl leading-tight text-gray-800 mb-4">{review.title}</h3>
            <div className="flex sm:items-center flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Link to={`/${review.authorUsername}`}>
                  <img
                    src={review.authorPicture || NoProfilePictureBlackIcon}
                    alt="user image"
                    className="w-10 h-10 rounded-full shadow-md"
                  />
                </Link>
                <Link to={`/${review.authorUsername}`} className="hover:underline">
                  <h6 className="font-semibold text-lg leading-6 text-indigo-600">@{review.authorUsername}</h6>
                </Link>
              </div>
              <p className="font-normal text-md leading-6 text-gray-500">{formattedDate}</p>
            </div>
            <p className="font-normal text-md leading-7 text-gray-600 max-xl:text-justify">
              {review.content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewCard;