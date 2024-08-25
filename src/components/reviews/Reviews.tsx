import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ReviewCard from "./ReviewCard";
import { ReviewSummary } from "./ReviewSummary";
import { useEffect, useState } from "react";
import { Review } from "../../types/review";
import { getReviews } from "../../services/reviewService";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const { id: surveyId } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getReviews(surveyId || '');
        setReviews(reviews);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="border-2 p-10 rounded-md">
      <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center">Our customer reviews
      </h2>
      <div className="pt-8">
        <ReviewSummary />
      </div>
      <div>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
        }
      </div>
      <div className="fixed bottom-10 right-10">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>

    </div>
  );
}

export default Reviews;