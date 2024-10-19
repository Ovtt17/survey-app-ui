import { FC } from 'react';

interface ReviewCardGlimmerProps {

}

const ReviewCardGlimmer: FC<ReviewCardGlimmerProps> = ({ }) => {
  return (
    <>
      {
        Array.from({ length: 3 }).map((_, index) => (
          <section key={index} className="my-8 py-4 relative bg-white shadow-lg rounded-lg animate-pulse">
            <div className="w-full max-w-4xl px-6 md:px-8 lg:px-10 mx-auto">
              <div className="w-full">
                <div className="pt-8 pb-6 border-b border-slate-200">
                  <div className="h-8 bg-slate-300 rounded mb-4"></div>
                  <div className="h-6 bg-slate-300 rounded mb-4"></div>
                  <div className="flex sm:items-center flex-col sm:flex-row justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-300 rounded-full shadow-md"></div>
                      <div className="h-6 bg-slate-300 rounded w-24"></div>
                    </div>
                    <div className="h-6 bg-slate-300 rounded w-24"></div>
                  </div>
                  <div className="h-6 bg-slate-300 rounded mb-2"></div>
                  <div className="h-6 bg-slate-300 rounded mb-2"></div>
                  <div className="h-6 bg-slate-300 rounded mb-2"></div>
                </div>
              </div>
            </div>
          </section>
        ))
      }
    </>
  );
}

export default ReviewCardGlimmer;