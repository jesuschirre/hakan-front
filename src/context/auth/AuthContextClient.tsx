import { useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import API_URL from "../../services/Api";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface Usuario {
  name: string;
  email: string;
  avatar: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔐 OBTENER USUARIO LOGUEADO
  const fetchUsuario = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/me`,
        { withCredentials: true }
      );
      setUsuario(response.data); // ✅ correcto
    } catch {
      setUsuario(null);
    } 
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  // LOGIN
  const Handlelogincli = async (email: string, password: string) => {
    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/api/login`,
        { email, password },
        { withCredentials: true }
      );

      await fetchUsuario(); // ✅ ACTUALIZA EL CONTEXTO
      setTimeout(() => {
        setLoading(false);
        navigate("/client/dashboard");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  
  // LOGIN GOOGLE
  const handleGoogleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      window.location.href = `${API_URL}/auth/google/redirect`;
    }, 300); // 300ms es suficiente para renderizar
  };

  // REGISTER CLIENTE
  const handleregistercli = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    identification_type_code: string,
    number: string
  ) => {
    if (password !== password_confirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/register`,
        {
          name,
          email,
          password,
          password_confirmation,
          identification_type_code,
          number
        },
        { withCredentials: true }
      );

      // ✅ ACTUALIZAR CONTEXTO
      await fetchUsuario();

      // ✅ ENVIAR AL PANEL
      // ⏳ pequeño delay para UX
      setTimeout(() => {
        setLoading(false);
        navigate("/client/dashboard");
      }, 1500);

    } catch (error) {
      console.error(error);
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await axios.post(
      `${API_URL}/api/logout`,
      {},
      { withCredentials: true }
    );
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, loading, Handlelogincli, logout, handleGoogleLogin, handleregistercli }}
    >
      {children}
    </AuthContext.Provider>
  );
}