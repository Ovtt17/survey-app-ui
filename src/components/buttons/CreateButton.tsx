import { FC } from 'react';

interface CreateButtonProps {
  handleCreate?: () => void;
}

const CreateButton: FC<CreateButtonProps> = ({ handleCreate }) => {

  const handleClick = () => {
    if (handleCreate) {
      handleCreate();
    }
  };

  return (
    <button
      onClick={handleClick}
      className='create-button bg-create-button shadow-lg shadow-create-button border-none rounded-full cursor-pointer text-4xl font-bold text-[#FAFAFA] h-[64px] w-[64px] z-10'>
      <span>+</span>
    </button>
  );
}

export default CreateButton;