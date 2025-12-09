
import Header from "./components/Header";
import Card from "./components/Card";

export default function DashboardClient() {
  return (
    <div>
      <Header />
      <main className=" p-6 mt-4">
        <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Técnicos activos" value="87" />
          <Card title="Servicios en curso" value="23" />
          <Card title="Clientes satisfechos" value="98%" />
        </div>
      </main>
    </div>
  );
}