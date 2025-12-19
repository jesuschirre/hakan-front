import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../../services/Api";

/* =======================
   INTERFACES
======================= */
interface Role {
  id: number;
  name: string;
  guard_name: string;
}

interface Permission {
  id: number;
  name: string;
  guard_name: string;
}

interface NewPermission {
  name: string;
  guard: string;
}

export default function ConfiguracionRu() {
  const [guard, setGuard] = useState("rubro");
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [newPermissions, setNewPermissions] = useState<NewPermission[]>([]);
  const [permissionName, setPermissionName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const loadRoles = async () => {
    const res = await axios.get(`${API_URL}/api/rubro/roles`, { withCredentials: true });
    setRoles(res.data.roles);
  };

  const loadPermissions = async () => {
    const res = await axios.get(`${API_URL}/api/rubro/permissions`, { withCredentials: true });
    setPermissions(res.data.permissions);
  };

  useEffect(() => {
    loadRoles();
    loadPermissions();
  }, []);

  const createRole = async () => {
    await axios.post(`${API_URL}/api/rubro/roles/create`, { name: newRoleName, guard_name: guard }, { withCredentials: true });
    setNewRoleName("");
    loadRoles();
    alert("Rol creado");
  };

  const addNewPermission = () => {
    if (!permissionName.trim()) return;
    setNewPermissions([...newPermissions, { name: permissionName, guard }]);
    setPermissionName("");
  };

  const createPermissions = async () => {
    await axios.post(`${API_URL}/api/rubro/permissions/create`, { permissions: newPermissions }, { withCredentials: true });
    setNewPermissions([]);
    loadPermissions();
    alert("Permisos creados");
  };

  const togglePermission = (name: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const assignPermissionsToRole = async () => {
    await axios.post(`${API_URL}/api/rubro/roles/assign-permissions`, {
      role_name: selectedRole,
      guard_name: guard,
      permissions: selectedPermissions,
    }, { withCredentials: true });
    setSelectedPermissions([]);
    alert("Permisos asignados");
  };

  // Estilos personalizados basados en tu paleta
  const colors = {
    dark: "#3b3845",
    yellow: "#f6c20e",
    light: "#ebebea",
    gray: "#8f8c91",
    paleGold: "#ead888",
    brown: "#795e1a"
  };

  return (
    <div className="" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className=" mx-auto space-y-8">
      

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ===== TARJETA: CREAR ROL ===== */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4" style={{ borderTopColor: colors.yellow }}>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.yellow }}></span>
              Crear Nuevo Rol
            </h2>
            <div className="space-y-4">
              <input
                className="w-full border-2 p-3 rounded-lg focus:outline-none transition-all"
                style={{ borderColor: colors.light, focusColor: colors.yellow }}
                placeholder="Ej: Administrador"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
              <button
                onClick={createRole}
                className="w-full py-3 rounded-lg font-bold transition-transform active:scale-95 shadow-sm"
                style={{ backgroundColor: colors.yellow, color: colors.dark }}
              >
                + Registrar Rol
              </button>
            </div>
          </div>

          {/* ===== TARJETA: CREAR PERMISOS ===== */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4" style={{ borderTopColor: colors.brown }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: colors.dark }}>Añadir Permisos</h2>
            <div className="flex gap-2 mb-4">
              <input
                className="flex-1 border-2 p-3 rounded-lg focus:outline-none"
                style={{ borderColor: colors.light }}
                placeholder="Ej: editar.usuario"
                value={permissionName}
                onChange={(e) => setPermissionName(e.target.value)}
              />
              <button
                onClick={addNewPermission}
                className="px-4 rounded-lg font-bold text-white"
                style={{ backgroundColor: colors.dark }}
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {newPermissions.map((p, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: colors.paleGold, color: colors.brown }}>
                  {p.name}
                </span>
              ))}
            </div>

            <button
              onClick={createPermissions}
              disabled={newPermissions.length === 0}
              className="w-full py-3 rounded-lg font-bold text-white disabled:opacity-30 shadow-sm"
              style={{ backgroundColor: colors.brown }}
            >
              Guardar Lista de Permisos
            </button>
          </div>
        </div>

        {/* ===== TARJETA: ASIGNAR PERMISOS (ANCHO COMPLETO) ===== */}
        <div className="bg-white p-8 rounded-xl shadow-md border-l-8" style={{ borderLeftColor: colors.dark }}>
          <h2 className="text-xl font-bold mb-6" style={{ color: colors.dark }}>Asignación de Permisos a Roles</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.gray }}>1. Selecciona el Rol</label>
              <select
                className="w-full border-2 p-3 rounded-lg bg-white"
                style={{ borderColor: colors.light }}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">-- Elige un rol --</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.gray }}>2. Selecciona los Permisos</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg border-2 border-dashed" style={{ borderColor: colors.light }}>
                {permissions.map((p) => (
                  <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border-2"
                        style={{ borderColor: colors.gray }}
                        checked={selectedPermissions.includes(p.name)}
                        onChange={() => togglePermission(p.name)}
                      />
                      <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </span>
                    </div>
                    <span className="text-sm transition-colors group-hover:text-black" style={{ color: colors.gray }}>{p.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={assignPermissionsToRole}
              disabled={!selectedRole || selectedPermissions.length === 0}
              className="px-10 py-3 rounded-lg font-bold text-white transition-all hover:brightness-110 disabled:opacity-20 shadow-lg"
              style={{ backgroundColor: colors.dark }}
            >
              Confirmar Asignación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}