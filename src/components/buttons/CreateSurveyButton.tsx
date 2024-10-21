import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import CreateButton from './CreateButton';

interface CreateSurveyButtonProps {
  handleOpenErrorModal: () => void;
}

const CreateSurveyButton: FC<CreateSurveyButtonProps> = ({ handleOpenErrorModal }) => {
  const { verifySession } = useAuthContext();


  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    verifySession(e, handleOpenErrorModal, () => { });
  };
  return (
    <Link
      to='/surveys/create'
      onClick={handleClick}
      className='fixed bottom-10 right-10 z-50'
    >
      <CreateButton />
    </Link>
  );
}

export default CreateSurveyButton;