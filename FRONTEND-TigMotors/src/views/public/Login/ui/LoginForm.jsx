import { Input, Label, Button } from 'keep-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // Maneja el mensaje de éxito

  const FormError = ({ message }) => (
    <div className="block font-medium text-red-500 text-sm">
      {message}
    </div>
  );

  const onSubmit = async (data) => {
    setSuccessMessage(null); // Reinicia el mensaje de éxito

    try {
      const response = await axios.post("http://localhost:8085/api/v1/login-users", data);
      console.log("Inicio de sesión exitoso");
      setSuccessMessage("Ingresando a la mesa de trabajo Tig"); // Establece el mensaje de éxito
      // Aquí puedes agregar una redirección si es necesario
      setTimeout(() => {
        window.location.href = "/dashboard"; // Cambiar la ruta según tu sistema
      }, 2000);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data || error.message);
    }
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
                  className="bg-gray-800 border-slate-900 text-white"
                  {...register('username', { required: 'Tu usuario es requerido' })}
                />
                {errors.username && <FormError message={errors.username.message} />}
              </fieldset>

              <fieldset className="max-w-md space-y-1">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <Label htmlFor="password">Contraseña</Label>
                  <a href="/reset-password" className="text-sm text-gray-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="bg-gray-800 border-slate-900 text-white w-full pr-10"
                    placeholder="Tu contraseña"
                    {...register('password', { required: 'Tu contraseña es requerida' })}
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

              <div className="mt-6 space-y-5">
                <Button type="submit" color="success" className="w-full">
                  Sign In
                </Button>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mt-4 text-center text-green-500 font-medium">
                  {successMessage}
                </div>
              )}
            </div>
          </form>

          {/* Bottom link */}
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            ¿No tienes una cuenta? Solicita tu registro aquí{' '}
            <a href="/register" className="font-medium text-indigo-500">
              Solicitar Registro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
