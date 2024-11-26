import { Input, Label, Button } from "keep-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const FormError = ({ message }) => (
    <div className="block font-medium text-red-500 text-sm">{message}</div>
  );

  const onSubmit = async (data) => {
    setErrorMessage(null);

    try {
      // Realizar la solicitud al backend
      const response = await axios.post(
        "http://localhost:8085/api/v1/login-global",
        data
      );

      console.log("Respuesta del servidor:", response.data);

      if (response.data.status !== "success") {
        setErrorMessage("Error de autenticación. Intente nuevamente.");
        return;
      }

      // Decodificar el token para obtener el rol
      const decodedToken = jwtDecode(response.data.token);
      const userRole = decodedToken.roles[0]?.authority;

      // Guardar el token y el rol en localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", userRole);

      // Redirigir según el rol
      switch (userRole) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "PERSONAL_CENTRO_DE_SERVICIOS":
          navigate("/personal");
          break;
        case "USER":
          navigate("/user");
          break;
        default:
          setErrorMessage("Rol desconocido. Por favor, contacte al administrador.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data || error.message);

      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error al iniciar sesión. Verifique sus credenciales.");
      }
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Inicio de sesión
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <fieldset className="max-w-md space-y-1">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Usuario"
                  className="bg-gray-800 border-slate-900 text-white"
                  {...register("username", { required: "Tu usuario es requerido" })}
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
                    type={showPassword ? "text" : "password"}
                    className="bg-gray-800 border-slate-900 text-white w-full pr-10"
                    placeholder="Tu contraseña"
                    {...register("password", {
                      required: "Tu contraseña es requerida",
                      minLength: {
                        value: 8,
                        message: "La contraseña debe tener al menos 8 caracteres.",
                      },
                      maxLength: {
                        value: 30,
                        message: "La contraseña no puede tener más de 30 caracteres.",
                      },
                    })}
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
                  Iniciar Sesión
                </Button>
              </div>

              {errorMessage && (
                <div className="mt-4 text-center text-red-500 font-medium">
                  {errorMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
