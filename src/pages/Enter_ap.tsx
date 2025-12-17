import { Link } from "react-router-dom";
export default function Enter_ap() {
  const userTypes = [
    { id: 1, label: "Cliente", color: "blue", path: "/client/main" },
    { id: 2, label: "Técnico", color: "green", path: "/company/login" },
    { id: 3, label: "Afiliado", color: "yellow", path: "/company/login" },
    { id: 4, label: "Administrador", color: "red", path: "/rubro/login" },
    { id: 4, label: "Colaborador", color: "red", path: "/rubro/login" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-6">
          ¿Qué tipo de usuario eres?
        </h1>

        {/* Lista de opciones */}
        <div className="grid grid-cols-1 gap-4">
          {userTypes.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex items-center justify-center py-3 rounded-xl
                border-2 border-${item.color}-500
                text-${item.color}-600 font-semibold
                transition-all duration-200
                hover:bg-${item.color}-500 hover:text-white
                active:scale-95
                cursor-pointer
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}