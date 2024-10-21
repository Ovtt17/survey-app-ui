import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NotFoundAnimation from "../../assets/lottie/NotFoundAnimation.lottie";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-2 sm:gap-4">
      <DotLottieReact
        src={NotFoundAnimation}
        loop
        autoplay
        className="w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[330px]"
      />
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl leading-snug text-blue-gray-900">
        OOPS!
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-500">
        Esta no es la página que buscas
      </p>
      <Link to='/'>
        <button className="px-4 py-2 bg-midnight-black text-white rounded md:w-[10rem]">
          volver al inicio
        </button>
      </Link>
    </div>
  );
};

export default NotFound;