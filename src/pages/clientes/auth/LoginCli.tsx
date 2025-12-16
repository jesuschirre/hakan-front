import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Ball from "../components/ball";
import { Link } from "react-router-dom";
import LoadingSp from "../../../components/LoadingSp";

export default function LoginCli() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Handlelogincli, handleGoogleLogin, loading } = useAuth();

  return (
    <>
      {loading ? (
        <LoadingSp mensaje="Entrando al panel" />
      ) : (
        <div className="flex w-full h-screen">
          <div className="w-full flex items-center justify-center lg:w-1/2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                Handlelogincli(email, password);
              }}
              className="bg-white shadow-lg rounded-2xl px-6 py-6 w-full max-w-md"
            >
              <h1 className="text-3xl font-semibold text-center text-gray-800">
                Iniciar sesión
              </h1>

              <p className="text-sm text-gray-500 text-center mt-2 mb-6">
                Bienvenido de vuelta, ingresa tus credenciales
              </p>

              {/* Email */}
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-4 text-sm"
              />

              {/* Password */}
              <label className="text-sm font-medium">Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-4 text-sm"
              />

              {/* Links */}
              <div className="flex justify-between text-sm text-gray-500 mb-5">
                <Link to="" className="text-primary">
                  ¿Olvidaste tu contraseña?
                </Link>

                <Link to="/client/register" className="text-primary">
                  Crear cuenta
                </Link>
              </div>

              {/* Buttons */}
              <button
                type="submit"
                className="w-full bg-primary text-white rounded-xl py-2.5 text-sm font-semibold
                           hover:bg-amber-500 transition active:scale-95"
              >
                Iniciar sesión
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="mt-3 flex items-center justify-center gap-2 w-full py-2.5
                           border border-gray-300 rounded-xl text-sm hover:bg-gray-50"
              >
                <FaGoogle />
                Continuar con Google
              </button>
            </form>
          </div>
          <Ball />
        </div>
      )}
    </>
  );
}