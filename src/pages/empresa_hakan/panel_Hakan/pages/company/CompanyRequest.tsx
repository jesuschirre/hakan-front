import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { Plus, X, UserCheck } from "lucide-react";
import { HiCheck, HiX } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import Swal from "sweetalert2";

import API_URL from "../../../../../services/Api";

/* =======================
   Interfaces
======================= */

interface Companies {
  id: number;
  name: string;
  ruc: string;
  status: string;
  email: string;
  approval_status: number;
}

export default function CompanyList() {
  const [openModal, setOpenModal] = useState(false);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState("");

  const [companies, setCompanies] = useState<Companies[]>([]);
  const [loadingApproveId, setLoadingApproveId] = useState<number | null>(null);
  const [loadingRejectId, setLoadingRejectId] = useState<number | null>(null);

  /* =======================
     Obtener empresas
  ======================= */

  const GetCompanies = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/rubro/companies`,
        { withCredentials: true }
      );

      const pendientes = res.data.data.filter(
        (company: Companies) => company.approval_status === 0
      );

      setCompanies(pendientes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetCompanies();
  }, []);

  /* =======================
     Aprobar empresa
  ======================= */

  const ApproveCompany = async (id: number) => {
    try {
      setLoadingApproveId(id);

      await axios.post(
        `${API_URL}/api/rubro/companies/${id}/approve`,
        {},
        { withCredentials: true }
      );

      setCompanies(prev => prev.filter(c => c.id !== id));

      Swal.fire({
        icon: "success",
        title: "Empresa aprobada",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoadingApproveId(null);
    }
  };

  /* =======================
     Rechazar empresa (Swal)
  ======================= */

  const RejectCompany = async (id: number) => {
    const { value: reason, isConfirmed } = await Swal.fire({
      title: "Rechazar empresa",
      input: "textarea",
      inputLabel: "Motivo del rechazo",
      inputPlaceholder: "Escribe el motivo...",
      showCancelButton: true,
      confirmButtonText: "Rechazar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      inputValidator: (value) => {
        if (!value || value.trim().length < 5) {
          return "Debe tener al menos 5 caracteres";
        }
        return null;
      },
    });

    if (!isConfirmed) return;

    try {
      setLoadingRejectId(id);

      await axios.post(
        `${API_URL}/api/rubro/companies/${id}/reject`,
        { reason },
        { withCredentials: true }
      );

      setCompanies(prev => prev.filter(c => c.id !== id));

      Swal.fire({
        icon: "success",
        title: "Empresa rechazada",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Error al rechazar",
      });
    } finally {
      setLoadingRejectId(null);
    }
  };

  /* =======================
     Columnas tabla
  ======================= */

  const columns: ColumnDef<Companies>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "name" },
    { header: "RUC", accessorKey: "ruc" },
    { header: "Email", accessorKey: "email" },
    {
      header: "Estado",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const value = getValue<string>();

        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
            {value}
          </span>
        );
      },
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {/* Aprobar */}
          <button
            onClick={() => ApproveCompany(row.original.id)}
            disabled={loadingApproveId === row.original.id}
            className="p-2 rounded-lg hover:bg-emerald-50 text-emerald-600"
          >
            {loadingApproveId === row.original.id ? (
              <CgSpinner className="animate-spin" />
            ) : (
              <HiCheck size={18} />
            )}
          </button>

          {/* Rechazar */}
          <button
            onClick={() => RejectCompany(row.original.id)}
            disabled={loadingRejectId === row.original.id}
            className="p-2 rounded-lg hover:bg-red-50 text-red-600"
          >
            {loadingRejectId === row.original.id ? (
              <CgSpinner className="animate-spin" />
            ) : (
              <HiX size={18} />
            )}
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  /* =======================
     Render
  ======================= */

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Solicitudes de Empresas</h1>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => (
                  <th key={header.id} className="p-4 text-xs font-bold uppercase">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t hover:bg-slate-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}