import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "./hooks/useAuth.ts";

export default function LoginCli() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Handlelogincli } = useAuth();
  const {handleGoogleLogin} = useAuth();

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <form
          className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            Handlelogincli(email, password);
          }}
        >
          <h1 className="text-5xl font-semibold text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h1>

          <p className="font-medium text-lg text-gray-500 mt-4">
            Bienvenido devuelta, introduce tus credenciales
          </p>

          <div className="mt-7">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="w-full border-2 border-gray-100 rounded-2xl p-4 mt-1 bg-transparent mb-4"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="text-lg font-medium">Contraseña</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="w-full border-2 border-gray-100 rounded-2xl p-4 mt-1 bg-transparent"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex mt-5 gap-4">
              <button className="font-medium text-base text-cyan-500 cursor-pointer">
                Recuperar tu contraseña
              </button>

              <div className="flex">
                <p>No tienes cuenta?</p>
                <button className="font-medium text-base text-cyan-500 cursor-pointer">
                  sing up
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-y-4">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all font-bold w-full 
                  bg-cyan-500 rounded-xl text-white text-lg py-3 hover:scale-[1.01] ease-in-out cursor-pointer"
              >
                Sign in
              </button>

              <button
                className="flex items-center justify-center gap-3 w-full py-3 border-2 border-gray-300 rounded-xl 
                font-medium text-gray-700 transition-all duration-200 hover:scale-[1.02] 
                hover:bg-gray-50 active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
                onClick={handleGoogleLogin}
              >
                <FaGoogle />
                Continuar con Google
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-linear-to-tr from-cyan-500 to-pink-500 rounded-full animate-spin" />
        <div className="w-full h-1/2 absolute bg-white/10 bottom-0 backdrop-blur-lg" />
      </div>
    </div>
  );
}