import { useState } from "react";
import { Button } from "./button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Servicios", href: "#features" },
    { name: "Testimonios", href: "#testimonials" },
    { name: "Precios", href: "#pricing" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold">HAKAN</span>
          </Link>

          {/* LINKS DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* BOTONES DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/client/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white cursor-pointer">
                Iniciar Sesión
              </Button>
            </Link>

            <Link to="/client/register">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold cursor-pointer">
                Comenzar
              </Button>
            </Link>
          </div>

          {/* BOTÓN MOBILE */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MENÚ MOBILE */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-slate-400 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            <div className="flex flex-col gap-2 pt-4 border-t border-slate-800 mt-4">
              <Link to="/client/login">
                <Button variant="ghost" className="w-full">
                  Iniciar Sesión
                </Button>
              </Link>

              <Link to="/client/register">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 w-full">
                  Comenzar
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}