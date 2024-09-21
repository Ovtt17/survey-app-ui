import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface CreateSurveyButtonProps {
  handleOpenErrorModal: () => void;
}

const CreateSurveyButton: FC<CreateSurveyButtonProps> = ({ handleOpenErrorModal }) => {
  const { verifySession } = useAuthContext();


  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    verifySession(e, handleOpenErrorModal, () => {});
  };
  return (
    <Link onClick={handleClick} to='/surveys/create'>
      <button className='bg-create-button shadow-lg shadow-create-button border-none rounded-full cursor-pointer text-[50px] fixed bottom-[30px] right-[8%] font-bold text-[#FAFAFA] flex justify-center items-center h-[64px] w-[64px] transform transition-transform duration-300 ease-in-out hover:rotate-[224deg] z-10'>
        +
      </button>
    </Link>
  );
}

export default CreateSurveyButton;