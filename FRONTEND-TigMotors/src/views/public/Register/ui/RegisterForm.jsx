import { useForm } from 'react-hook-form';
import { Input, Label, Button } from 'keep-react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const FormError = ({ message }) => (
    <div className="block font-medium text-red-500 text-sm">
      {message}
    </div>
  );

  const onSubmit = (data) => {
    console.log(data);
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Solicitud de registro
            </h1>
          </div>

          {/* Sign-up form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <fieldset className="max-w-md space-y-1">
                <Label htmlFor="name">Nombre o propietario <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ingrese su nombre o nombre de la empresa"
                  {...register('name', { required: 'Su nombre es requerido' })}
                  className='bg-gray-800 border-slate-900 text-white'
                />
                {errors.name && <FormError message={errors.name.message} />}
              </fieldset>

              <fieldset className="max-w-md space-y-1">
                <Label htmlFor="number">Numero celular <span className="text-red-500">*</span></Label>
                <Input
                  id="number"
                  type="number"
                  placeholder="Ingrese su número celular"
                  {...register('number', { required: 'Su numero celular es requerido' })}
                  className='bg-gray-800 border-slate-900 text-white'
                />
                {errors.number && <FormError message={errors.number.message} />}
              </fieldset>

              <fieldset className="max-w-md space-y-1">
                <Label htmlFor="email">Correo electronico <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico"
                  {...register('email', { required: 'Su correo electronico es requerido' })}
                  className='bg-gray-800 border-slate-900 text-white'
                />
                {errors.email && <FormError message={errors.email.message} />}
              </fieldset>

              <fieldset className="max-w-md space-y-1">
      <Label htmlFor="password">Contraseña <span className="text-red-500">*</span></Label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="La contraseña requiere 10 caracteres"
          {...register('password', { required: 'Es requerido utilizar contraseña' })}
          className="bg-gray-800 border-slate-900 text-white w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.password && <FormError message={errors.password.message} />}
    </fieldset>
            </div>

            <div className="mt-6 space-y-5">
              <Button type="submit" color="success" className="w-full">
                Solicitar registro
              </Button>
            </div>
          </form>

          {/* Bottom link */}
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Ya tienes una cuenta creada?{' '}
            <a href="/login" className="font-medium text-indigo-500">
            Inicia sesión aquí
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}