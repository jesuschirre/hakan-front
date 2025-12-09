import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Laura Fernández",
      role: "Cliente",
      content:
        "Solicité un técnico para revisar mi lavadora y llegó en menos de una hora. Súper rápido y seguro.",
      rating: 5,
    },
    {
      name: "Jorge Martínez",
      role: "Técnico Afiliado",
      content:
        "Gracias a HAKAN tengo más clientes todos los días. Todo está organizado y fácil de gestionar.",
      rating: 5,
    },
    {
      name: "Empresa ServiMax",
      role: "Empresa Afiliada",
      content:
        "El sistema nos permite controlar a nuestros técnicos y recibir solicitudes sin complicaciones.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Lo que dicen{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              nuestros usuarios
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Clientes, técnicos y empresas confían en HAKAN para un servicio seguro y eficiente.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Testimonio */}
              <p className="text-slate-300 mb-6">"{testimonial.content}"</p>

              {/* Usuario */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}