import axios from "axios";
import { type NavigateFunction } from "react-router-dom";

let isLoggingOut = false; // evita múltiples ejecuciones

export const createAxiosInstance = (
  navigate: NavigateFunction,
  logout: () => void,
  isAuthenticated: () => boolean
) => {
  const instance = axios.create({
    withCredentials: true,
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      const status = error.response?.status;

      // 🔴 SOLO si estaba autenticado
      if (status === 401 && isAuthenticated() && !isLoggingOut) {
        isLoggingOut = true;
        logout();
      }

      // 🟠 SIN PERMISOS
      if (status === 403) {
        navigate("/403");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};