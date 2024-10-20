import LoadingIndicator from './LoadingIndicator';

const LoadingComponent = () => {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-100 flex items-center justify-center z-40">
      <LoadingIndicator />
    </div>
  );
}

export default LoadingComponent;