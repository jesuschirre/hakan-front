import { useState } from "react";
import { Star, MessageSquare, Send, User, Building2, CheckCircle } from "lucide-react";

export default function Calification() {
  const [ratingTecnico, setRatingTecnico] = useState(0);
  const [ratingEmpresa, setRatingEmpresa] = useState(0);
  const [hoverTecnico, setHoverTecnico] = useState(0);
  const [hoverEmpresa, setHoverEmpresa] = useState(0);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    // Aquí iría la lógica para enviar a tu API
  };

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">¡Gracias por tu opinión!</h2>
        <p className="text-slate-500 mt-2">Tu feedback nos ayuda a mejorar la calidad del servicio.</p>
        <button 
          onClick={() => setEnviado(false)}
          className="mt-6 text-blue-600 font-semibold hover:underline"
        >
          Volver al panel
        </button>
      </div>
    );
  }

  return (
    <div className="p-6  mx-auto  font-sans">
      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-800 mb-2">Finalizar Servicio</h2>
          <p className="text-slate-500 italic">¿Cómo fue tu experiencia hoy?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Calificación del Técnico */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4 text-slate-700 font-bold uppercase tracking-widest text-xs">
              <User size={16} className="text-blue-500" />
              Califica al Técnico
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverTecnico(star)}
                  onMouseLeave={() => setHoverTecnico(0)}
                  onClick={() => setRatingTecnico(star)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={42}
                    className={`transition-colors duration-200 ${
                      star <= (hoverTecnico || ratingTecnico)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Calificación de la Empresa */}
          <div className="flex flex-col items-center border-t border-slate-50 pt-10">
            <div className="flex items-center gap-2 mb-4 text-slate-700 font-bold uppercase tracking-widest text-xs">
              <Building2 size={16} className="text-blue-500" />
              Califica a la Empresa
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverEmpresa(star)}
                  onMouseLeave={() => setHoverEmpresa(0)}
                  onClick={() => setRatingEmpresa(star)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={32}
                    className={`transition-colors duration-200 ${
                      star <= (hoverEmpresa || ratingEmpresa)
                        ? "fill-blue-500 text-blue-500"
                        : "text-slate-200"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comentarios */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <MessageSquare size={16} />
              Tus Comentarios (Opcional)
            </label>
            <textarea
              placeholder="Cuéntanos un poco más sobre el servicio..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-600 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all min-h-[120px] resize-none"
            />
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={ratingTecnico === 0}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Enviar Calificación
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}