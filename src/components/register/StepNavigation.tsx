import { FC } from 'react';

interface StepNavigationProps {
  step: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

const StepNavigation: FC<StepNavigationProps> = ({ step, handlePrevStep, handleNextStep }) => {
  return (
    <div className="flex justify-between items-center lg:col-span-2">
      {step > 0 && (
        <div>
          <button
            type="button"
            onClick={handlePrevStep}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Atrás
          </button>
        </div>
      )}
      <div className="flex-1 text-right">
        <button
          type="button"
          onClick={handleNextStep}
          className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default StepNavigation;