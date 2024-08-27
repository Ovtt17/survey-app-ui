import { Rating } from '@mui/material';
import React from 'react';

interface ReviewModalProps {
  newReview: {
    title: string;
    content: string;
    rating: {
      rating: number;
    };
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCloseModal: () => void;
  handleSubmitReview: () => void;
  setNewReview: (review: any) => void;
  isLoading: boolean;
  error: string | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  newReview,
  handleInputChange,
  handleCloseModal,
  handleSubmitReview,
  setNewReview,
  isLoading,
  error
}) => {
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
        <div className="py-4">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={newReview.title}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Content</label>
            <textarea
              name="content"
              value={newReview.content}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter content"
            />
          </div>
          <div className="mb-4">
            <span className="text-gray-600 flex items-center">
              Rating:
              <Rating
                onChange={(_, newValue) => {
                  setNewReview({
                    ...newReview,
                    rating: {
                      ...newReview.rating,
                      rating: newValue || 0,
                    }
                  });
                }}
                name="read-only ml-1"
                size="small"
                value={newReview.rating.rating}
                precision={0.5}
              />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
          <button type="button" className="py-2.5 px-5 text-xs bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100" onClick={handleCloseModal}>Cancel</button>
          <button type="button" className="py-2.5 px-5 text-xs bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700" onClick={handleSubmitReview} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}

export default ReviewModal;