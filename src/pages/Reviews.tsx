import ReviewCard from "../components/reviews/ReviewCard";
import { ReviewSummary } from "../components/reviews/ReviewSummary";
import { useEffect, useState } from "react";
import { Review } from "../types/review";
import { getReviews, saveReview } from "../services/reviewService";
import { useParams } from "react-router-dom";
import ReviewModal from "../components/reviews/ReviewModal";
import CreateButton from "../components/buttons/CreateButton";

const Reviews = () => {
  const { id: surveyId } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultReview: Review = {
    title: "",
    content: "",
    surveyId: Number(surveyId),
    rating: {
      rating: 0,
      surveyId: Number(surveyId),
    }
  }
  const [newReview, setNewReview] = useState<Review>(defaultReview);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  }, [surveyId]);

  const handleNewReview = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewReview(defaultReview);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await saveReview(newReview);
      setReviews([...reviews, newReview]);
      handleCloseModal();
    } catch (error) {
      setError("Failed to save review");
      console.error("Failed to save review", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-2 p-10 rounded-md">
      <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center">
        Reseñas de la encuesta
      </h2>
      <div className="pt-8">
        <ReviewSummary surveyId={Number(surveyId)} />
      </div>
      <div>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <div className="fixed bottom-10 right-10">
        <CreateButton handleCreate={handleNewReview} />
      </div>
      {isModalOpen && (
        <ReviewModal
          newReview={newReview}
          handleInputChange={handleInputChange}
          handleCloseModal={handleCloseModal}
          handleSubmitReview={handleSubmitReview}
          setNewReview={setNewReview}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
}

export default Reviews;