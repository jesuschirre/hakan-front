import { useState } from "react";
import axios from "axios";
import API_URL from "../../../services/Api";

interface EmpresaForm {
  name: string;
  ruc: string;
  email: string;
  phone: string;
  ubigeo_id: string;
}

export default function Form_Empresa() {
  const [form, setForm] = useState<EmpresaForm>({
    name: "",
    ruc: "",
    email: "",
    phone: "",
    ubigeo_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      await axios.post(
        `${API_URL}/api/rubro/companies/affiliation`,
        {
            name: form.name,
            ruc: form.ruc,
            email: form.email,
            phone: form.phone || null,
            ubigeo_id: form.ubigeo_id || null,
        },
        {
            withCredentials: true,
        }
        );

      setMessage("Solicitud enviada correctamente ✅");
      setForm({
        name: "",
        ruc: "",
        email: "",
        phone: "",
        ubigeo_id: "",
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Error al enviar la solicitud ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6  rounded-xl shadow mb-10">
      <h2 className="text-xl font-semibold mb-4">
        Solicitud de Afiliación de Empresa
      </h2>

      {message && (
        <p className="mb-3 text-green-600">{message}</p>
      )}

      {error && (
        <p className="mb-3 text-red-600">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre de la empresa"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="ruc"
          placeholder="RUC"
          value={form.ruc}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Teléfono (opcional)"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* UBIGEO */}
        <select
          name="ubigeo_id"
          value={form.ubigeo_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione Ubigeo</option>
          <option value="1">Lima</option>
          <option value="2">Arequipa</option>
          <option value="3">Huancayo</option>
        </select>

        {/* ESTADO VISUAL */}
        <div className="text-sm text-gray-600">
          <p>📌 Estado inicial:</p>
          <ul className="list-disc ml-5">
            <li>Aprobación: <b>Pendiente</b></li>
            <li>Cuenta: <b>Inactiva</b></li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>
    </div>
  );
}