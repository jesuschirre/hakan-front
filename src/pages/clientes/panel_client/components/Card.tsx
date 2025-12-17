interface CardProps {
  title: string;
  value: string | number;
}

export default function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl h-55">
      <h2 className="text-text font-semibold">{title}</h2>
      <p className="text-4xl mt-2 font-bold text-primary">{value}</p>
    </div>
  );
}
