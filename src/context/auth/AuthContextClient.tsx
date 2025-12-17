import { useState, useEffect, type ReactNode } from "react";
import API_URL from "../../services/Api";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../../services/axios";

interface Usuario {
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosAuth = createAxiosInstance(navigate);

  // 🔐 OBTENER USUARIO LOGUEADO
  const fetchUsuario = async () => {
    try {
      const response = await axiosAuth.get(
        `${API_URL}/api/me`
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
      await axiosAuth.post(
        `${API_URL}/api/login`,
        { email, password }
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
      await axiosAuth.post(
        `${API_URL}/api/register`,
        {
          name,
          email,
          password,
          password_confirmation,
          identification_type_code,
          number
        },
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
    await axiosAuth.post(
      `${API_URL}/api/logout`,
      {}
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