function App() {
  return (
    // Contenedor principal para centrar el formulario en la pantalla
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      {/* Tarjeta del formulario de inicio de sesión */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión 🚀
        </h2>
        
        <form>
          {/* Campo de Correo Electrónico */}
          <div className="mb-5">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu.correo@ejemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
              required
            />
          </div>
          
          {/* Campo de Contraseña */}
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
              required
            />
          </div>
          
          {/* Botón de Inicio de Sesión */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 shadow-md"
          >
            Entrar
          </button>
        </form>
        
        {/* Enlace para recuperar contraseña (Opcional) */}
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Olvidaste tu contraseña? 
          <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium ml-1 transition duration-150">
            Recuperar
          </a>
        </p>
      </div>
    </div>
  )
}

export default App