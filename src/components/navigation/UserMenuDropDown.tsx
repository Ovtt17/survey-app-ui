import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { MenuItem } from '@headlessui/react';

const UserMenuDropDown = () => {
  const { isAuthenticated, logout, user } = useAuthContext();

  return (
    <>
      {isAuthenticated ? (
        <>
          <MenuItem>
            <a href={`/${user?.username}`} className="block w-full h-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Perfil
            </a>
          </MenuItem>
          <MenuItem>
            <Link to={`/${user?.username}/surveys`} className="block w-full h-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Mis Encuestas
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to={`/${user?.username}/reports`} className="block w-full h-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Generar Reportes
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/settings" className="block w-full h-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Configuración
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/" onClick={logout} className="block w-full h-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Cerrar Sesión
            </Link>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <Link to="/login" className="block w-full h-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Sign In
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/register" className="block w-full h-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Register
            </Link>
          </MenuItem>
        </>
      )}
    </>
  );
}

export default UserMenuDropDown;