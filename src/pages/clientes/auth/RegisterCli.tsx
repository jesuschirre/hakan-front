import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.ts";

export default function RegisterCli() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Confirmar contraseña
  const [identification_type_code, setTipoID] = useState<string>("");
  const [number, setNumeroID] = useState<string>("");
  const { handleregistercli } = useAuth();
  const { handleGoogleLogin } = useAuth();

  // Función para redirigir al dashboard después de un registro exitoso
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleregistercli(name, email, password, confirmPassword, identification_type_code, number);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 w-full max-w-2xl"
        >
          <h1 className="text-5xl font-semibold text-center text-gray-800 mb-6">Registrarse</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">Crea una cuenta con nosotros</p>

          <div className="mt-7">
            {/* Nombre */}
            <label className="text-lg font-medium">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full border-2 border-gray-100 rounded-2xl p-4 mt-1 bg-transparent mb-4"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border-2 border-gray-100 rounded-2xl p-4 mt-1 bg-transparent mb-4"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Contraseña */}
            <label className="text-lg font-medium">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border-2 border-gray-100 rounded-2xl p-4 mt-1 bg-transparent mb-4"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirmar Contraseña */}
            <label className="text-lg font-medium">Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full border-2 border-gray-100 rounded-2xl p-4 mt-1 bg-transparent mb-4"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Tipo de Identificación */}
            <label className="text-lg font-medium">Tipo de Identificación</label>
            <select
              name="tipoIdentificacion"
              className="w-full border-2 border-gray-100 rounded-2xl p-4 mt-1 bg-transparent"
              required
              value={identification_type_code}
              onChange={(e) => setTipoID(e.target.value)}
            >
              <option value="" disabled>Selecciona un tipo de identificación</option>
              <option value="DNI">DNI (Documento Nacional de Identidad)</option>
              <option value="CE">Carnet de Extranjería</option>
              <option value="PAS">Pasaporte</option>
              <option value="RUC">RUC (Registro Único de Contribuyentes)</option>
            </select>

            {/* Número de Identificación */}
            <label htmlFor="numeroID" className="text-lg font-medium">Número de Identificación</label>
            <input
              id="numeroID"
              type="text"
              placeholder="Ingresa tu número de identificación"
              maxLength={11}
              className="w-full border-2 border-gray-100 rounded-2xl p-4 mt-1 bg-transparent"
              required
              value={number}
              onChange={(e) => setNumeroID(e.target.value.replace(/[^0-9]/g, ''))} // Limpia caracteres no numéricos
            />

            <div className="flex mt-5 gap-4">
              <div className="flex">
                <p>¿Ya tienes cuenta?</p>
                <button
                  type="button"
                  onClick={() => navigate("/client/login")}
                  className="font-medium text-base text-cyan-500 cursor-pointer ml-1"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-y-4">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all font-bold w-full bg-cyan-500 rounded-xl text-white text-lg py-3 hover:scale-[1.01] ease-in-out cursor-pointer"
              >
                Registrarse
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full py-3 border-2 border-gray-300 
                rounded-xl font-medium text-gray-700 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-50 
                active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
              >
                <FaGoogle />
                Crear cuenta con Google
              </button>
            </div>

          </div>
        </form>

      </div>

      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-linear-to-tr from-amber-500 to-cyan-500 rounded-full animate-spin" />
        <div className="w-full h-1/2 absolute bg-white/10 bottom-0 backdrop-blur-lg" />
      </div>
    </div>
  );
}