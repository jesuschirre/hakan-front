interface CardProps {
  title: string;
  value: string | number;
}

export default function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-cyan-500">
      <h2 className="text-slate-500 font-semibold">{title}</h2>
      <p className="text-4xl mt-2 font-bold text-cyan-600">{value}</p>
    </div>
  );
}
