export const ProfileInfoGlimmer = () => {
  return (
    <aside className="w-full lg:w-1/5 lg:max-w-1/3 lg:pb-6 animate-pulse">
      <div className="flex flex-col gap-6 items-center lg:items-start">
        <div className="relative flex justify-center w-full max-w-xs lg:max-w-sm">
          <div className="w-full aspect-square rounded-full bg-gray-300"></div>
        </div>
        <div className="text-center lg:text-left w-full">
          <div className="h-6 bg-gray-300 rounded mb-2 w-3/4 lg:w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 lg:w-3/4"></div>
        </div>
        <div className="w-full">
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </aside>
  );
}
