import { useState } from "react";
import { 
  CreditCard, 
  Download, 
  History,  
  ArrowUpRight, 
  CheckCircle2, 
  FileText 
} from "lucide-react";

/* =======================
   Interfaces
======================= */
interface Factura {
  id: string;
  fecha: string;
  monto: number;
  estado: "Pagado" | "Pendiente";
  servicio: string;
}

export default function PagosCl() {
  const [facturas] = useState<Factura[]>([
    { id: "FAC-001", fecha: "15 Dic 2025", monto: 45.00, estado: "Pendiente", servicio: "Reparación Laptop" },
    { id: "FAC-002", fecha: "01 Dic 2025", monto: 25.50, estado: "Pagado", servicio: "Mantenimiento PC" },
    { id: "FAC-003", fecha: "20 Nov 2025", monto: 120.00, estado: "Pagado", servicio: "Instalación Red" },
  ]);

  return (
    <div className="p-6 mx-auto font-sans">
      
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary rounded-2xl shadow-lg">
          <CreditCard className="text-white " size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Gestión de Pagos</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Tarjeta de Pago Rápido */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 ">
              <p className="text-slate-400 text-sm font-medium mb-1">Total Pendiente</p>
              <h3 className="text-4xl font-bold mb-6">$45.00</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                  <span>Servicio Actual</span>
                  <span className="font-semibold text-emerald-400">En curso</span>
                </div>
                <button className="w-full bg-primary hover:bg-amber-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group">
                  Pagar Ahora
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
            {/* Decoración de fondo */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <History size={16} /> Métodos Guardados
            </h4>
            <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl bg-slate-50">
              <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
              <span className="text-sm font-medium text-slate-600">**** 4242</span>
              <CheckCircle2 size={16} className="text-emerald-500 ml-auto" />
            </div>
          </div>
        </div>

        {/* Columna Derecha: Facturas e Historial */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">Facturas Recientes</h3>
              <button className="text-blue-600 text-sm font-semibold hover:underline">Ver todo</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Factura / Fecha</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Monto</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {facturas.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">{f.id}</p>
                            <p className="text-xs text-slate-400">{f.fecha}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-slate-700 text-sm">
                        ${f.monto.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                          f.estado === "Pagado" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                        }`}>
                          {f.estado}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors group">
                          <Download size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}