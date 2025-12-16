import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500 mt-2 mb-6">
        La página que buscas no existe
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-xl hover:scale-105 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
