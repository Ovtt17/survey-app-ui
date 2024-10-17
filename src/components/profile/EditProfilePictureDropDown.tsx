import { FC, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Menu, MenuItem } from '@mui/material';
import { deleteProfilePicture, uploadProfilePicture } from '../../services/ImageService';
import { isValidImageFormat } from '../../utils/imageUtils';
interface EditProfilePictureDropDownProps {
  profilePicture?: string;
  handleProfilePictureChange: (newProfilePicture: string) => void;
}

const EditProfilePictureDropDown: FC<EditProfilePictureDropDownProps> = ({ profilePicture, handleProfilePictureChange }) => {
  const [menuAnchorElement, setMenuAnchorElement] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorElement);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorElement(null);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidImageFormat(file)) {
      alert('Por favor, selecciona un archivo de imagen válido (jpg, jpeg, png).');
      handleMenuClose();
      return;
    }

    try {
      const newProfilePicture = await uploadProfilePicture(file);
      handleProfilePictureChange(newProfilePicture);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Hubo un error al subir la imagen. Por favor, inténtalo de nuevo.');
    } finally {
      handleMenuClose();
    }
  };

  const handleImageDelete = async () => {
    try {
      await deleteProfilePicture();
      handleProfilePictureChange('');
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      alert('Hubo un error al eliminar la imagen. Por favor, inténtalo de nuevo.');
    }
  }

  return (
    <div className='absolute border bottom-0 left-0 mb-5 ml-8 md:mb-3 md:ml-4 px-2 py-0.5 bg-midnight-black text-white rounded-md hover:bg-gray-700'>
      <button
        aria-label="Edit profile picture"
        onClick={handleMenuOpen}
      >
        <EditIcon
          fontSize="small"
        />
        <span className="hidden lg:inline">Editar</span>
      </button>
      <Menu
        anchorEl={menuAnchorElement}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem sx={{ fontSize: '14px' }}>
          <label htmlFor="upload-photo" style={{ cursor: 'pointer' }}>
            Cambiar foto
          </label>
          <input
            type="file"
            id="upload-photo"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </MenuItem>
        {profilePicture &&
          <MenuItem
            onClick={handleImageDelete}
            sx={{ fontSize: '14px' }}
          >
            <label htmlFor="delete-photo" style={{ cursor: 'pointer' }}>
              Eliminar
            </label>
          </MenuItem>}
      </Menu>
    </div>
  );
}

export default EditProfilePictureDropDown;