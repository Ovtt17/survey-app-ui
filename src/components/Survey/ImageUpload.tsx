import React, { useState } from 'react';
import { SurveySubmission } from '../../types/survey';

interface ImageUploadProps {
  setFormData: (data: SurveySubmission) => void;
  formData: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setFormData, formData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, picture: reader.result as string });
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center text-center p-5 bg-gray-100'>
      <label className='text-lg font-bold p-2'>Imagen de la Encuesta</label>
      <div
        className='w-full p-2 border-2 border-dashed border-gray-400 flex justify-center items-center'
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) {
            handleFileChange(file);
          }
        }}
      >
        <input
          type="file"
          name="Picture"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileChange(file);
            }
          }}
          className='w-full p-2 opacity-0 absolute'
        />
        <span className='text-gray-400'>Arrastra una imagen aquí o haz clic para seleccionar</span>
      </div>
      {previewUrl && (
        <div className='mt-4'>
          <img src={previewUrl} alt="Preview" className='w-full max-md:h-48 h-52' />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;