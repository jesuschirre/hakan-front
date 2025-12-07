import React from 'react';

// 1. Definición de Tipos para las props de StatCard
interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: 'green' | 'red' | 'yellow' | 'indigo'; // Limitamos los valores de color
}

// 2. Componente StatCard con tipado explícito
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  
  // Función auxiliar para obtener las clases de color (más limpio que ternarios anidados)
  const getColorClasses = (type: 'bg' | 'text' | 'border') => {
    switch (type) {
      case 'bg':
        return {
          green: 'bg-green-100',
          red: 'bg-red-100',
          yellow: 'bg-yellow-100',
          indigo: 'bg-indigo-100',
        }[color];
      case 'text':
        return {
          green: 'text-green-600',
          red: 'text-red-600',
          yellow: 'text-yellow-600',
          indigo: 'text-indigo-600',
        }[color];
      case 'border':
        return {
          green: 'border-green-500',
          red: 'border-red-500',
          yellow: 'border-yellow-500',
          indigo: 'border-indigo-500',
        }[color];
      default:
        return '';
    }
  };

  return (
    <div className={`p-6 bg-white rounded-xl shadow-lg flex items-center justify-between transition duration-300 hover:shadow-2xl hover:scale-[1.02] border-l-4 ${getColorClasses('border')}`}>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${getColorClasses('bg')} ${getColorClasses('text')}`}>
        <span className="text-2xl">{icon}</span> 
      </div>
    </div>
  );
};

// 3. Componente Principal del Dashboard (no requiere props, así que no necesita tipado)
export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* 1. Barra de Navegación Lateral (Sidebar) */}
      <aside className="w-64 bg-white shadow-xl flex flex-col fixed h-full">
        <div className="p-6 text-2xl font-extrabold text-indigo-700 border-b">
          Panel 🚀
        </div>
        
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {/* Elementos del menú */}
          <a href="#" className="flex items-center p-3 text-indigo-700 bg-indigo-100 rounded-lg font-semibold hover:bg-indigo-200 transition duration-150">
            <span className="mr-3">🏠</span>
            Inicio
          </a>
          <a href="#" className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 transition duration-150">
            <span className="mr-3">👤</span>
            Usuarios
          </a>
          <a href="#" className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 transition duration-150">
            <span className="mr-3">📊</span>
            Reportes
          </a>
          <a href="#" className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 transition duration-150">
            <span className="mr-3">⚙️</span>
            Configuración
          </a>
        </nav>
        
        {/* Pie de página del Sidebar */}
        <div className="p-4 border-t text-center text-xs text-gray-400">
          © 2025 Mi Aplicación
        </div>
      </aside>

      {/* 2. Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-8 pl-64"> 
        
        {/* Encabezado del Contenido */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Resumen General
          </h1>
          <p className="text-gray-500 mt-1">
            Bienvenido de vuelta, aquí están tus estadísticas principales.
          </p>
        </header>

        {/* --- Tarjetas de Estadísticas --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Aquí el tipado de TypeScript garantiza que solo podemos usar los colores definidos */}
          <StatCard title="Ventas Hoy" value="$12,450" icon="📈" color="green" />
          <StatCard title="Nuevos Clientes" value="321" icon="👥" color="red" />
          <StatCard title="Pedidos Pendientes" value="45" icon="📦" color="yellow" />
          <StatCard title="Tasa de Conversión" value="4.8%" icon="🎯" color="indigo" />
        </section>

        {/* --- Sección de Gráficos/Tablas (Placeholder) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Gráfico Principal */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Rendimiento Semanal
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 text-gray-400 rounded-lg">
              [Espacio para Gráfico]
            </div>
          </div>

          {/* Lista de Actividad */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Actividad Reciente
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 border-b pb-2">📦 Pedido #987 enviado.</li>
              <li className="text-sm text-gray-600 border-b pb-2">💰 $1500 procesados.</li>
              <li className="text-sm text-gray-600 border-b pb-2">👤 Nuevo usuario registrado.</li>
              <li className="text-sm text-gray-600">⚙️ Configuración actualizada.</li>
            </ul>
          </div>
        </section>
        
      </main>
    </div>
  )
}