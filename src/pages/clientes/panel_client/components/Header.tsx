export default function Header() {
  return (
    <header className=" h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <input
        type="text"
        placeholder="Buscar..."
        className="border px-3 py-2 rounded-lg w-64"
      />

      <div className="flex items-center gap-4">
        <span className="font-semibold text-slate-600">Hola, Jesús</span>
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}