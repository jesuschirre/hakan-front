import { useState, useEffect, type ReactNode } from "react";
import API_URL from "../../services/Api";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createAxiosInstance } from "../../services/axios";
import axios from "axios";
interface Usuario {
  name: string;
  email: string;
  avatar: string;
  phone: string;
}
type ValidationErrors = {
  [key: string]: string[];
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [panels, setPanels] = useState<string[]>([]);
  const [activePanel, setActivePanel] = useState<string>("");
  const navigate = useNavigate();
  const isAuthenticated = () => !!usuario;

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        { withCredentials: true }
      );
    } catch {
    } finally {
      setUsuario(null);
      setPanels([]);
      setActivePanel("");
      setLoading(false);
      navigate("/");
    }
  };
    
  const axiosAuth = createAxiosInstance(
    navigate,
    logout,
    isAuthenticated
  );

  // 🔐 OBTENER USUARIO LOGUEADO
  const fetchUsuario = async () => {
    try {
      const response = await axiosAuth.get(
        `${API_URL}/api/me`
      );
      setUsuario(response.data.user); // ✅ correcto
      setPanels(response.data.panels);
      setActivePanel(response.data.active_panel)
    } catch {
      setUsuario(null);
    } 
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  // LOGIN
  const Handlelogincli = async (email: string, password: string, Navigate: string) => {
    try {
      setLoading(true);

      const response = await axiosAuth.post(
        `${API_URL}/api/login`,
        { email, password }
      );

      const message = response.data.message; // 👈 MENSAJE DEL BACKEND

      await fetchUsuario(); // ✅ ACTUALIZA EL CONTEXTO

      setTimeout(() => {
        setLoading(false);
        navigate(Navigate);

        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: message, // 👈 aquí
        });
      }, 1500);

    } catch (error: any) {
      setLoading(false);
      // 👇 Mensaje de error del backend
      const errorMessage =
        error.response?.data?.message || "Error al iniciar sesión";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  // LOGIN GOOGLE
  const handleGoogleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      window.location.href = `${API_URL}/auth/google/redirect`;
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Exito al iniciar sesión",
        });
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
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Las contraseñas no coinciden",
    });
    return;
  }

  setLoading(true);

  try {
    const response = await axiosAuth.post(
      `${API_URL}/api/register`,
      {
        name,
        email,
        password,
        password_confirmation,
        identification_type_code,
        number,
      }
    );

    const message = response.data.message; // 👈 MENSAJE BACKEND

    // ✅ ACTUALIZAR CONTEXTO
    await fetchUsuario();

    setTimeout(() => {
      setLoading(false);
      navigate("/client/dashboard");

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: message, // 👈 "Usuario registrado correctamente"
      });
    }, 1500);

  } catch (error: any) {
    setLoading(false);

    // 🔴 ERRORES DE VALIDACIÓN (422)
      if (error.response?.status === 422) {
        const errors = error.response?.data?.errors as ValidationErrors | undefined;

        // Tomar el primer error
        const firstError =
        errors && Object.values(errors).length > 0
          ? Object.values(errors)[0][0]
          : "Error de validación";

        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: firstError,
        });

        return;
      }

      // 🔴 OTROS ERRORES
      const errorMessage =
        error.response?.data?.error ||
        "Ocurrió un error durante el registro";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };



  return (
    <AuthContext.Provider
      value={{ usuario, loading, panels, activePanel,  Handlelogincli, logout, handleGoogleLogin, handleregistercli }}
    >
      {children}
    </AuthContext.Provider>
  );
}