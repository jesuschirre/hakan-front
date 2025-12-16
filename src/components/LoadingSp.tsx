type LoadingSpProps = {
  mensaje?: string;
};

export default function LoadingSp({ mensaje = "Cargando" }: LoadingSpProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">{mensaje}...</p>
      </div>
    </div>
  );
}