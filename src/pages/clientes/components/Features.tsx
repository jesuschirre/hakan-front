import { Zap, Shield, Rocket, Users } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Atención Inmediata",
      description: "Solicita un técnico y recibe respuesta en minutos, sin llamadas ni complicaciones.",
    },
    {
      icon: Shield,
      title: "Seguridad Validada",
      description: "Todos los técnicos están verificados y respaldados por empresas formales afiliadas.",
    },
    {
      icon: Rocket,
      title: "Servicio Garantizado",
      description: "Seguimiento del servicio en tiempo real y confirmación final del cliente.",
    },
    {
      icon: Users,
      title: "Profesionales Calificados",
      description: "Técnicos especializados, certificados y con historial verificado dentro de HAKAN.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-4">

        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Todo lo que{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              necesitas
            </span>{" "}
            para solicitar un técnico seguro
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Una plataforma confiable que conecta clientes con técnicos verificados y empresas afiliadas,
            garantizando seguridad, rapidez y transparencia en cada servicio.
          </p>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <feature.icon className="text-cyan-400" size={24} />
              </div>

              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}