export default function SidebarClient() {
  return (
    <div className="flex h-screen">      
        {/* sidebar */}
      <aside className="w-72 bg-white shadow-lg p-6 border-r border-slate-200">
        <h2 className="text-2xl font-bold text-cyan-600 mb-6">Panel HAKAN</h2>

        <nav className="space-y-2">
          <a href="/client/dashboard" className="block p-3 rounded-lg hover:bg-cyan-100">
            Inicio
          </a>
          <a href="/client/dashboard/profile" className="block p-3 rounded-lg hover:bg-cyan-100">
            Perfil
          </a>
          <a href="/client/dashboard/services" className="block p-3 rounded-lg hover:bg-cyan-100">
            Servicios
          </a>
          <a href="/client/dashboard/settings" className="block p-3 rounded-lg hover:bg-cyan-100">
            Configuración
          </a>
        </nav>
      </aside>
    </div>
  )
}
