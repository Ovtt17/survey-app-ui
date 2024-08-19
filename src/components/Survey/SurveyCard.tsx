import React from "react";

interface SurveyCardProps {
  title: string;
  description: string;
  rating: number;
  author: string;
  onAnswerSurvey: () => void;
  onViewReviews: () => void;
  onRateSurvey: () => void;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ title, description, rating, author, onAnswerSurvey, onViewReviews, onRateSurvey }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <div className="mt-2">
        <span className="text-gray-600"><b>Autor:</b> {author}</span>
      </div>
      <div className="mt-2">
        <span className="text-yellow-500"><b>Rating:</b> {rating} / 5</span>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={onAnswerSurvey}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Responder Encuesta
        </button>
        <button
          onClick={onViewReviews}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ver Reseñas
        </button>
        <button
          onClick={onRateSurvey}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Valorar
        </button>
      </div>
    </div>
  );
};

export default SurveyCard;