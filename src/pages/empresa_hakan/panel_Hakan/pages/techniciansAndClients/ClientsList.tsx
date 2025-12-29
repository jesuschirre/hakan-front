import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
// Instalación: npm install lucide-react
import { Edit3, Plus, X, UserCheck, Trash  } from "lucide-react";

import axios from "axios";
import API_URL from "../../../../../services/Api";
/* =======================
   Interfaces e Interfaces
======================= */

interface Clients {
  id: number;
  user: {
    name:string;
    email:string;
  };
  user_id: number
} 

export default function ClientsList() {
  const [openModal, setOpenModal] = useState(false);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState("");
  const [clientes , setClientes] = useState<Clients[] >([]);

  console.log(clientes)

  const GetCompanies = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rubro/clients`, { withCredentials: true })
      setClientes(res.data.data); // 👈 aquí llega todo
    } catch (error:any) {
      console.log(error)
    }
  }
  useEffect(()=>{
    GetCompanies()
  },[])

  const columns: ColumnDef<Clients, any>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorFn: (row) => row.user?.name, },
    { header: "Email",  accessorFn: (row) => row.user?.email, cell: ({ getValue }) => getValue() ?? "N/A",},
    { header: "ID de cliente", accessorKey: "user_id" },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div>
          <button
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
            title="Asignar Técnico"
          >
            <Edit3 size={18} className="group-hover:scale-110 transition-transform" />
          </button>
          <button
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-blue-50 rounded-lg transition-colors group"
            title="Asignar Técnico"
          >
            <Trash  size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
      ),
    },
  ];

  const table = useReactTable({
    data: clientes,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(false);
    setTecnicoSeleccionado("");
  };

  return (
    <div className=" p-8 font-sans text-slate-900">
      <div className=" mx-auto">
        
        {/* Header con Botón de Acción */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Clientes</h1>
            <p className="text-slate-500 text-sm">Gestiona los clientes afiliados.</p>
          </div>
          <button 
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} />
            Nueva Solicitud
          </button>
        </div>

        {/* Tabla Moderna */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-slate-50/50 border-b border-slate-200">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 text-sm text-slate-600">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Moderno con Overlay Blur */}
      {openModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <UserCheck className="text-blue-600" size={22} />
                Asignar Técnico
              </h2>
              <button onClick={() => setOpenModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Eligir tipo de servicio
                </label>
                <select
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Elegir de la lista...</option>
                    <option >Electricista</option>
                    <option >Mecanico</option>
                    <option >Tecnico de Pcs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                </label>
                <select
                  value={tecnicoSeleccionado}
                  onChange={(e) => setTecnicoSeleccionado(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Elegir de la lista...</option>
   
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all active:scale-95"
                >
                  Confirmar Asignación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}