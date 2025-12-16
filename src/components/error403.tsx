import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function Error403() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Icono */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <FaLock size={28} />
          </div>
        </div>

        {/* Texto */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Acceso denegado
        </h1>

        <p className="text-gray-500 mb-6">
          No tienes permisos para acceder a esta página.
        </p>

        {/* Código */}
        <div className="text-7xl font-extrabold text-gray-200 mb-6">
          403
        </div>

        {/* Botón */}
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded-xl
                     font-semibold transition hover:bg-amber-500 active:scale-95"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}