import axios from "axios";
import { type NavigateFunction } from "react-router-dom";

export const createAxiosInstance = (navigate: NavigateFunction) => {
  const instance = axios.create({
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      if (status === 401) {
        // No autenticado → login
        navigate("/client/login");
      }

      if (status === 403) {
        // Sin permisos → 403
        navigate("/403");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
