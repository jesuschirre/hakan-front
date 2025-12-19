import { useState } from "react";
import { 
  User, 
  Lock, 
  Smartphone, 
  LogOut, 
  Camera, 
  ShieldCheck, 
  Mail, 
  MapPin,
  Save
} from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"perfil" | "seguridad">("perfil");
  const {usuario} = useAuth();
  console.log(usuario)
  return (
    <div className="p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header con Perfil Rápido */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 overflow-hidden">
              <img
                src={usuario?.avatar} // Imagen de mayor calidad
                alt="Avatar"
                referrerPolicy="no-referrer"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-slate-100 text-slate-500 hover:text-blue-600 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-black text-slate-800">{usuario?.name}</h2>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-1">
              <Mail size={14} /> {usuario?.email}
            </p>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveTab("perfil")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "perfil" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Datos Personales
            </button>
            <button 
              onClick={() => setActiveTab("seguridad")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "seguridad" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Seguridad
            </button>
          </div>
        </div>

        {activeTab === "perfil" ? (
          /* SECCIÓN DATOS PERSONALES */
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <User size={20} className="text-blue-500" /> Información General
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre Completo</label>
                  <input type="text" defaultValue={usuario?.name} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teléfono</label>
                   +51
                  <input type="text" defaultValue={usuario?.phone || ""} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dirección Principal</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
                    <input type="text" defaultValue="Av. Siempreviva 123, Lima" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                </div>
                <button type="button" className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-95">
                  <Save size={18} /> Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* SECCIÓN SEGURIDAD */
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Cambio de Contraseña */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Lock size={20} className="text-blue-500" /> Actualizar Contraseña
              </h3>
              <div className="space-y-4 max-w-md">
                <input type="password" placeholder="Contraseña actual" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                <input type="password" placeholder="Nueva contraseña" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95">
                  Cambiar Contraseña
                </button>
              </div>
            </div>

            {/* Sesiones Activas */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Smartphone size={20} className="text-blue-500" /> Sesiones Activas
              </h3>
              <p className="text-slate-400 text-sm mb-6">Dispositivos donde has iniciado sesión recientemente.</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">iPhone 13 - Lima, Perú</p>
                      <p className="text-xs text-emerald-500 font-medium">Activa ahora</p>
                    </div>
                  </div>
                  <ShieldCheck className="text-emerald-500" size={20} />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 text-slate-400 rounded-lg">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">MacBook Pro - Chrome</p>
                      <p className="text-xs text-slate-400">Hace 2 días</p>
                    </div>
                  </div>
                  <button className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors">
                    <LogOut size={18} />
                  </button>
                </div> 
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}