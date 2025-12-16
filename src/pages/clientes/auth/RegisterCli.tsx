import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.ts";
import Ball from "../components/ball.tsx";
import LoadingSp from "../../../components/LoadingSp.tsx";
export default function RegisterCli() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Confirmar contraseña
  const [identification_type_code, setTipoID] = useState<string>("");
  const [number, setNumeroID] = useState<string>("");
  const { handleregistercli, handleGoogleLogin, loading } = useAuth();

  // Función para redirigir al dashboard después de un registro exitoso
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleregistercli(name, email, password, confirmPassword, identification_type_code, number);
  };

  return (
    <>
      {loading ? (<LoadingSp mensaje="Creando la cuenta"/>) : ( 
      <div className="flex w-full h-screen">

        <div className="w-full flex items-center justify-center lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl px-6 py-6 w-full max-w-md"
          >
            <h1 className="text-3xl font-semibold text-center text-text">
              Registrarse
            </h1>
            <p className="text-sm text-text text-center mt-2 mb-5">
              Crea una cuenta con nosotros
            </p>

            {/* Nombre */}
            <label className="text-sm font-medium">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-3 text-sm"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-3 text-sm"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Contraseña */}
            <label className="text-sm font-medium">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-3 text-sm"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirmar */}
            <label className="text-sm font-medium">Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-3 text-sm"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Tipo ID */}
            <label className="text-sm font-medium">Tipo de identificación</label>
            <select
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-3 text-sm"
              required
              value={identification_type_code}
              onChange={(e) => setTipoID(e.target.value)}
            >
              <option value="" disabled>Selecciona</option>
              <option value="DNI">DNI</option>
              <option value="CE">Carnet de Extranjería</option>
              <option value="PAS">Pasaporte</option>
              <option value="RUC">RUC</option>
            </select>

            {/* Número ID */}
            <label className="text-sm font-medium">Número de identificación</label>
            <input
              type="text"
              maxLength={11}
              placeholder="Número"
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-4 text-sm"
              required
              value={number}
              onChange={(e) =>
                setNumeroID(e.target.value.replace(/[^0-9]/g, ""))
              }
            />

            {/* Acciones */}
            <button
              type="submit"
              className="w-full bg-primary text-text rounded-xl py-2.5 text-sm font-semibold
                        hover:bg-amber-500 transition active:scale-95"
            >
              Registrarse
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="mt-3 flex items-center justify-center gap-2 w-full py-2.5
                        border border-gray-300 rounded-xl text-sm hover:bg-gray-50"
            >
              <FaGoogle />
              Crear con Google
            </button>

            <p className="text-sm text-center text-gray-500 mt-4">
              ¿Ya tienes cuenta?
              <span
                onClick={() => navigate("/client/login")}
                className="ml-1 text-primary cursor-pointer font-medium"
              >
                Iniciar sesión
              </span>
            </p>
          </form>
        </div>
        <Ball/>
      </div>
    )}
    </>
  );
}