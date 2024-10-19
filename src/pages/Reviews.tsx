import { ReviewSummary } from "../components/reviews/ReviewSummary";
import { useEffect, useState } from "react";
import { Review } from "../types/review";
import { getReviews } from "../services/reviewService";
import { useParams } from "react-router-dom";
import ReviewModal from "../components/reviews/ReviewModal";
import CreateButton from "../components/buttons/CreateButton";
import ReviewCardGlimmer from "../components/reviews/ReviewCardGlimmer";
import ReviewCard from "../components/reviews/ReviewCard";

const Reviews = () => {
  const { id: surveyId } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getReviews(surveyId || '');
        setReviews(reviews);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [surveyId]);

  const handleNewReview = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border-2 p-10 rounded-md">
      <h2 className="font-bold text-4xl text-black mb-8 text-center">
        Reseñas de la encuesta
      </h2>
      <div className="pt-8">
        <ReviewSummary surveyId={Number(surveyId)} />
      </div>
      <div>
        {isLoading ? (
          <ReviewCardGlimmer />
        ) : (
          reviews.length === 0 && (
            <div className="text-center text-lg text-gray-500 mt-8">
              No hay reseñas para esta encuesta
            </div>
          )
        )}
        {reviews.map((review) => (
          <ReviewCard review={review} />
        ))}
      </div>
      <div className="fixed bottom-10 right-10">
        <CreateButton handleCreate={handleNewReview} />
      </div>
      {isModalOpen && (
        <ReviewModal
          surveyId={Number(surveyId)}
          reviews={reviews}
          setReviews={setReviews}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Reviews;