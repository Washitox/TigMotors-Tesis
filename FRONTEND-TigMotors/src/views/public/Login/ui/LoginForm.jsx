import { Input, Label, Button } from 'keep-react';
import { useForm } from 'react-hook-form';

export default function SignIn() {
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

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Inicio de sesión
            </h1>
          </div>

          {/* Sign-in form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <fieldset className="max-w-md space-y-1">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Usuario"
                  className='bg-gray-800 border-slate-900 text-white'
                  {...register('email', { required: 'Tu usuario es requerido' })}
                />
                {errors.email && <FormError message={errors.email.message} />}
              </fieldset>

              <fieldset className="max-w-md space-y-1">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <Label htmlFor="password">Contraseña</Label>
                  <a href="/reset-password" className="text-sm text-gray-600 hover:underline">
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className='bg-gray-800 border-slate-900 text-white'
                  placeholder="Tu contraseña"
                  {...register('password', { required: 'Tu contraseña es requerida' })}
                />
                {errors.password && <FormError message={errors.password.message} />}
              </fieldset>

              <div className="mt-6 space-y-5">
                <Button type="submit" color="success" className="w-full">
                  Sign In
                </Button>


              </div>
            </div>
          </form>

          {/* Bottom link */}
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            No tienes una cuenta?, Solicita tu registro aquí{' '}
            <a href="/register" className="font-medium text-indigo-500">
              Solicitar Registro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}