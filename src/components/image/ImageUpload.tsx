import React, { useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from 'react-hook-form';

const ImageUpload: React.FC = () => {
  const { setValue } = useFormContext();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setValue('picture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setValue('picture', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className='flex flex-col items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md'>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='p-2 border border-gray-300 rounded-md hover:border-blue-500 transition duration-150'
        ref={fileInputRef}
      />
      {preview && (
        <>
          <img
            src={preview}
            alt='Selected'
            className='w-full max-w-4xl h-auto border border-gray-300 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105'
          />
          <button
            onClick={handleRemoveImage}
            className='mt-2 p-2 bg-red-600 text-white rounded-md flex items-center gap-2 hover:bg-red-500 transition duration-150'
          >
            <DeleteIcon />
            <span>Eliminar imagen</span>
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
