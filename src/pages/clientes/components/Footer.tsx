export default function Footer() {
  return (
    <footer id="contact" className="py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">

          {/* LOGO + DESCRIPCIÓN */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <span className="text-slate-950 font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold">HAKAN</span>
            </a>

            <p className="text-slate-400 text-sm">
              Conectamos clientes con técnicos verificados para brindar servicios
              confiables, rápidos y seguros para el hogar y negocios.
            </p>
          </div>

          {/* SECCIONES */}
          {[
            {
              title: "Servicios",
              links: [
                "Electricidad",
                "Plomería",
                "Mantenimiento de PC",
                "Reparación de Electrodomésticos",
              ],
            },
            {
              title: "HAKAN",
              links: [
                "Sobre Nosotros",
                "Trabaja con Nosotros",
                "Conviértete en Técnico",
                "Soporte",
              ],
            },
            {
              title: "Legal",
              links: ["Política de Privacidad", "Términos de Uso", "Cookies"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} HAKAN. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}