import React, { useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
      {!preview && (
        <div
          className="w-full h-48 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-150"
          onClick={() => fileInputRef.current?.click()}
        >
          <AddPhotoAlternateIcon style={{ fontSize: '48px', color: 'gray' }} />
          <p className="text-gray-500">Haz clic o arrastra una imagen</p>
        </div>
      )}

      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='hidden'
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
