const SurveysGlimmer = () => {
  return (
    <section className="w-full h-full lg:w-2/3 p-4 flex flex-col animate-pulse">
      <div className="flex flex-wrap justify-start">
        {Array.from({ length: 2 }).map((_, index) => (
          <article key={index} className="w-full md:w-1/2 p-2">
            <div className="w-full pb-5 min-h-[520px]">
              <div className="max-sm:h-64 h-72 w-full bg-gray-300 flex-none bg-cover rounded-t text-center overflow-hidden">
                <figure className="w-full h-full flex justify-center items-center">
                  <div className="w-full h-full bg-gray-300"></div>
                </figure>
              </div>
              <div className="relative min-h-72 shadow-xl bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
                <div className="mb-6 mt-2">
                  <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SurveysGlimmer;