import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LoadingAnimation from '../../assets/lottie/LoadingAnimation.lottie';

const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center gap-2 text-midnight-blackd"
      aria-live="assertive"
      aria-busy="true"
    >
      <DotLottieReact
        src={LoadingAnimation}
        loop
        autoplay
        className='w-[300px] sm:w-[450px] h-[300px]  sm:h-[450px]'
      />
    </div>
  );
}

export default LoadingIndicator;