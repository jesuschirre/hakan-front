import { useState } from "react";
import { MessageSquare, XCircle, Clock, User, Wrench } from "lucide-react";

/* =======================
   Interfaces
======================= */
interface MiSolicitud {
  id: string;
  servicio: string;
  tecnico: string | null;
  estado: "En espera" | "En camino" | "Finalizado";
  fecha: string;
}

export default function SoliRealtime() {
  const [solicitudes, setSolicitudes] = useState<MiSolicitud[]>([
    {
      id: "SOL-102",
      servicio: "Reparación de Aire Acondicionado",
      tecnico: "Carlos Ruiz",
      estado: "En camino",
      fecha: "16 de Dic, 2025",
    },
    {
      id: "SOL-105",
      servicio: "Mantenimiento Eléctrico",
      tecnico: null,
      estado: "En espera",
      fecha: "18 de Dic, 2025",
    }
  ]);

  const getStatusStyles = (estado: MiSolicitud["estado"]) => {
    switch (estado) {
      case "En camino": return "bg-blue-100 text-blue-700";
      case "En espera": return "bg-amber-100 text-amber-700";
      case "Finalizado": return "bg-emerald-100 text-emerald-700";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary rounded-2xl shadow-lg">
          <Clock className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Mis Solicitudes</h2>
      </div>

      <div className="grid gap-6">
        {solicitudes.map((sol) => (
          <div key={sol.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Información Principal */}
              <div className="flex gap-4">
                <div className="h-14 w-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                  <Wrench size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${getStatusStyles(sol.estado)}`}>
                      {sol.estado}
                    </span>
                    <span className="text-slate-400 text-xs font-medium">{sol.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{sol.servicio}</h3>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <User size={14} /> {sol.tecnico || "Pendiente de asignar"} • {sol.fecha}
                  </p>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex items-center gap-2 border-t md:border-t-0 pt-4 md:pt-0">
                <button 
                  disabled={!sol.tecnico}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageSquare size={18} />
                  Chat
                </button>
                <button 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-red-100 text-red-500 hover:bg-red-50 rounded-xl font-semibold transition-all"
                  onClick={() => confirm("¿Seguro que deseas cancelar?")}
                >
                  <XCircle size={18} />
                  Cancelar
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {solicitudes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 font-medium text-lg">No tienes solicitudes activas.</p>
        </div>
      )}
    </div>
  );
}