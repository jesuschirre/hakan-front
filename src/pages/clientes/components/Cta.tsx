import { Button } from "./button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function Cta() {

  const companies = [
    "Ferretería Max",
    "TecnoFix",
    "ElectroService",
    "HogarPlus",
    "FixMaster",
  ];

  return (
    <section id="cta" className="py-24">
      <div className="container mx-auto px-4">

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-slate-800/50 border border-slate-700 p-8 md:p-16 overflow-hidden">

            {/* Efectos */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/30 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Contrata un técnico{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  en minutos
                </span>
              </h2>

              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                HAKAN te conecta con técnicos verificados para reparación,
                mantenimiento y emergencias en tu hogar o negocio.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/client/register">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-8 py-6 text-lg cursor-pointer">
                    Solicitar Técnico
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                
                <Link to="/client/login">
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-6 text-lg cursor-pointer"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                
              </div>

              <div className="mt-12 pt-8 border-t border-slate-700">
                <p className="text-sm text-slate-500 mb-4">
                  Empresas y negocios que confían en HAKAN
                </p>

                <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
                  {companies.map((c) => (
                    <span key={c} className="text-lg font-bold text-slate-400">
                      {c}
                    </span>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}