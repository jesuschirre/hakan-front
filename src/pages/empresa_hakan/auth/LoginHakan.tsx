export default function LoginHakan() {
  return (
    <div className="flex w-full h-screen bg-[#E8E6DF]">
      {/* Sección del Formulario */}
      <div className="w-full flex flex-col items-center justify-center lg:w-3/5 relative px-4">
        
        {/* Logo superior izquierda */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-800 rounded-sm flex items-center justify-center text-white text-[10px] font-bold">
            🧩
          </div>
          <span className="font-bold text-gray-800 tracking-tighter">RUBRO</span>
        </div>

        <form className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-text">
              Acceso Administración
            </h1>
            <p className="text-muted font-medium my-7">
              Panel de control general del sistema RUBRO
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-400 rounded-full p-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-400 rounded-full p-4  focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
              />

            </div>

            <div className="flex items-center justify-between px-2 text-sm text-gray-500">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600 rounded" />
                <span>Recordarme</span>
              </label>
              <button type="button" className="hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#FFB300] text-gray-800 font-bold py-4 rounded-2xl shadow-md transition-all active:scale-95 border-black border-2"
              >
                Iniciar Sesión
              </button>

            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="absolute bottom-6 text-gray-400 text-xs">
          © 2025 Todos los derechos reservados. RUBRO
        </div>
      </div>
      {/* Sección de la Imagen */}

      <div className="hidden relative lg:flex h-full w-1/2 bg-gray-200">

        <img

          src="https://images.pexels.com/photos/18780512/pexels-photo-18780512.jpeg?cs=srgb&dl=pexels-zetong-li-880728-18780512.jpg&fm=jpg"
          alt="Ciudad"
          className="w-full object-cover"
        />
        {/* Decoración opcional: un degradado sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}