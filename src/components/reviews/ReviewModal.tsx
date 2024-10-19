import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { NewReview, Review } from '../../types/review';
import { saveReview } from '../../services/reviewService';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ReviewModalProps {
  surveyId: number;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  handleCloseModal: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  surveyId,
  reviews,
  setReviews,
  handleCloseModal,
}) => {
  const defaultReview: NewReview = {
    title: "",
    content: "",
    surveyId: surveyId,
    rating: {
      rating: 0,
      surveyId: surveyId,
    }
  }

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<NewReview>({
    defaultValues: defaultReview,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<NewReview> = async (review) => {
    setIsLoading(true);
    setError(null);
    try {
      const savedReview = await saveReview(review);
      setReviews([...reviews, savedReview]);
      handleCloseModal();
    } catch (error) {
      setError("Hubo un error al guardar la reseña");
      console.error("Failed to save review", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="subscribe-form-modal" className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl py-4 px-5 w-3/4">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h4 className="text-sm text-gray-900 font-medium">Crear Reseña</h4>
          <button className="cursor-pointer" onClick={handleCloseModal}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "El título es obligatorio." })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter title"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Content</label>
            <textarea
              {...register("content", { required: "El contenido de la reseña es obligatorio" })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter content"
            />
            {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
          </div>
          <div className="mb-4">
            <span className="text-gray-600 flex items-center">
              Rating:
              <Rating
                onChange={(_, newValue) => {
                  setValue("rating.rating", newValue || 0);
                }}
                name="read-only ml-1"
                size="small"
                value={watch("rating.rating")}
                precision={0.5}
              />
            </span>
          </div>
          <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
            <button type="button" className="py-2.5 px-5 text-xs bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100" onClick={handleCloseModal}>Cancel</button>
            <button type="submit" className="py-2.5 px-5 text-xs bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;