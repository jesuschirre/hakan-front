import { Button } from "./button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <div>
        {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Contrata servicios tecnicos
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              desde tu casa
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Plataforma para contartar servicios tecnicos desde tu casa, rapido y efeicente.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/client/register">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-8 py-6 text-lg cursor-pointer">
                Comenzar
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/client/login">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg cursor-pointer"
              >
                Inicia Sesión
              </Button>
            </Link>
           
          </div>
        </div>
      </section>
    </div>
  )
}