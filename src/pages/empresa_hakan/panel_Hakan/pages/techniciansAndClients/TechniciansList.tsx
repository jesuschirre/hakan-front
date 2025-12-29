import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Edit3, Plus, X, UserCheck, Trash } from "lucide-react";
import axios from "axios";
import API_URL from "../../../../../services/Api";

/* =======================
   Interfaces
======================= */

interface Client {
  id: number;
  status: number;
  user_id: number;
  company_id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  company: {
    id: number;
    name: string;
    ruc: string;
  };
}

/* =======================
   Component
======================= */

export default function TechniciansList() {
  const [openModal, setOpenModal] = useState(false);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState("");
  const [clientes, setClientes] = useState<Client[]>([]);

  /* =======================
     Fetch data
  ======================= */

  const getTechnicians = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rubro/technicians`, {
        withCredentials: true,
      });

      // SOLO el array de datos
      setClientes(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTechnicians();
  }, []);

  /* =======================
     Columns
  ======================= */

  const columns: ColumnDef<Client>[] = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Nombre",
      accessorFn: (row) => row.user?.name,
    },
    {
      header: "Email",
      accessorFn: (row) => row.user?.email,
      cell: ({ getValue }) => getValue() ?? "N/A",
    },
    {
      header: "Empresa",
      accessorFn: (row) => row.company?.name,
    },
    {
      header: "RUC",
      accessorFn: (row) => row.company?.ruc,
    },
    {
      header: "Estado",
      accessorFn: (row) => (row.status === 1 ? "Activo" : "Inactivo"),
      cell: ({ getValue }) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            getValue() === "Activo"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {getValue() as string}
        </span>
      ),
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Editar"
          >
            <Edit3 size={18} />
          </button>
          <button
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
            title="Eliminar"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  /* =======================
     Table
  ======================= */

  const table = useReactTable({
    data: clientes,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  /* =======================
     Modal submit
  ======================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(false);
    setTecnicoSeleccionado("");
  };

  /* =======================
     Render
  ======================= */

  return (
    <div className="p-8 font-sans text-slate-900">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Técnicos</h1>
            <p className="text-slate-500 text-sm">
              Gestiona los técnicos afiliados.
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg active:scale-95"
          >
            <Plus size={20} />
            Nueva Solicitud
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-slate-50 border-b border-slate-200"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-4 text-xs font-bold uppercase text-slate-500"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 text-sm text-slate-600">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <UserCheck size={22} />
                Asignar Técnico
              </h2>
              <button onClick={() => setOpenModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <select
                value={tecnicoSeleccionado}
                onChange={(e) => setTecnicoSeleccionado(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
              >
                <option value="">Elegir técnico...</option>
              </select>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="flex-1 border rounded-xl py-3"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white rounded-xl py-3"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}