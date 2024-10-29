import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import ErrorModal from '../error/ErrorModal';
import NoProfilePictureWhiteIcon from '../../assets/no-profile-picture-bg-white.svg';
import AppIcon from '../../assets/app_icon.svg';
import UserMenuDropDown from './UserMenuDropDown';


const navigation = [
  { name: 'Encuestas', href: '/surveys' },
  { name: 'Reportes', href: '/reports' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const { isAuthenticated, user } = useAuthContext();
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const handleConfirmLogin = () => {
    setOpenErrorModal(false);
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to={'/'}>
              <div className="flex flex-shrink-0 items-center">
                <img
                  alt="Your Company"
                  src={AppIcon}
                  className="h-8 w-auto"
                />
              </div>
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.href === currentPath ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 rounded-md text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="Profile Picture"
                    src={
                      isAuthenticated
                        ? user?.profilePictureUrl || NoProfilePictureWhiteIcon
                        : NoProfilePictureWhiteIcon
                    }
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <UserMenuDropDown />
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.href === currentPath ? 'page' : undefined}
              className={classNames(
                item.href === currentPath ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>

      <ErrorModal
        open={openErrorModal}
        setOpen={setOpenErrorModal}
        title="Error"
        message="Para realizar esta acción es necesario iniciar sesión"
        confirmText="Iniciar Sesión"
        onConfirm={handleConfirmLogin}
      />
    </Disclosure>
  )
}