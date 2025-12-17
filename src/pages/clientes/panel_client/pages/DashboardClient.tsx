import Card from "../components/Card";
import { 
  type ColumnDef, 
  flexRender, 
  getCoreRowModel, 
  useReactTable,
  type CellContext // Importamos esto para el tipado de las celdas
} from '@tanstack/react-table';

interface Data {
  name: string;
  email: string;
  role: 'Cliente' | 'Técnico' | 'Empresa';
  status: 'Activo' | 'Inactivo';
}

export default function DashboardClient() {
  const data: Data[] = [
    { name: "Juan Pérez", email: "juan@mail.com", role: "Cliente", status: "Activo" },
    { name: "Ana Torres", email: "ana@mail.com", role: "Técnico", status: "Activo" },
    { name: "Carlos Ruiz", email: "carlos@mail.com", role: "Empresa", status: "Inactivo" },
  ];

  const columns: ColumnDef<Data, any>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Correo",
      accessorKey: "email",
    },
    {
      header: "Rol",
      accessorKey: "role",
      // Tipamos 'info' como CellContext<Data, any>
      cell: (info: CellContext<Data, any>) => (
        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Estado",
      accessorKey: "status",
      cell: (info: CellContext<Data, any>) => {
        const value = info.getValue();
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              value === "Activo"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {value}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // SOLUCIÓN AL ERROR DE KEY: Usar el email como ID único de fila
    getRowId: (row) => row.email, 
  });

  return (
    <div>
      <main className="mt-4">
        <h1 className="text-3xl font-bold mb-6 dark:text-bg">Panel de Control</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Técnicos activos" value="87" />
          <Card title="Servicios en curso" value="23" />
          <Card title="Clientes satisfechos" value="98%" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-4">
          <div className="md:col-span-2">
            <div className="p-6 bg-white rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">Usuarios registrados</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id} className="border-b">
                        {headerGroup.headers.map(header => (
                          <th key={header.id} className="text-left p-3 text-gray-600 font-medium">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id} className="hover:bg-gray-50 transition">
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="p-3">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <Card title="Resumen Adicional" value="Info" />
          </div>         
        </div>
      </main>
    </div>
  );
}