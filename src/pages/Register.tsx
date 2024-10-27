import { FC, useState } from 'react';
import { registerUser } from '../services/authService';
import { NewUser } from '../types/user';
import RegistrationForm from '../components/register/RegistrationForm';
import SuccessModal from '../components/modals/SuccessModal';
import AppIcon from '../assets/app_icon.svg';
import { FormProvider, useForm } from 'react-hook-form';
import { newUserDefault } from '../data/NewUserDefault';

const Register: FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const methods = useForm<NewUser>({
    defaultValues: newUserDefault,
  });

  const handleSubmit = async (user: NewUser) => {
    try {
      const isRegistered = await registerUser(user);
      setIsRegistered(isRegistered);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <section className="flex px-5 min-h-screen flex-col justify-center items-center">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-5xl bg-white rounded-2xl shadow-md">
        <div className={`min-h-80 relative p-12 ${isRegistered ? 'flex justify-center items-center' : 'lg:grid lg:grid-cols-2 lg:gap-6 lg:pt-24'}`}>
          {isRegistered ? (
            <SuccessModal
              open={true}
              title="¡Registro Exitoso!"
              message={`Hemos enviado un correo electrónico a tu dirección de correo "${methods.getValues('email')}". Por favor, revisa tu bandeja de entrada y sigue el enlace de activación para completar el registro.`}
              buttonText="Activar cuenta"
              buttonLink="/activate-account"
            />
          ) : (
            <>
              <article className="text-center lg:text-left">
                <img
                  alt="Your Company"
                  src={AppIcon}
                  className="lg:absolute lg:top-10 lg:left-10 mx-auto lg:mx-0 h-10 w-auto mb-4"
                />
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Crear Cuenta
                </h2>
                <p className="mt-2 text-md text-gray-600">
                  Completa la información para crear tu cuenta
                </p>
              </article>
              <article className="flex flex-col justify-between">
                <FormProvider {...methods}>
                  <RegistrationForm
                    handleSubmit={methods.handleSubmit(handleSubmit)}
                  />
                </FormProvider>
              </article>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register;