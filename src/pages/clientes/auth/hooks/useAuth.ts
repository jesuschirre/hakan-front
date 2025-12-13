import { useNavigate } from "react-router-dom";
import API_URL from "../../../../services/Api.js";
import axios from "axios";

export const useAuth = () => {
  const navigate = useNavigate();

  const Handlelogincli = async (email: string, password: string) => {
    try {
      await axios.post(
        `${API_URL}/api/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      navigate("/client/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google/redirect`;
  };

  const handleregistercli = async (name:string, email:string, password:string, password_confirmation:string, identification_type_code:string, number:string) => {
    if (password !== password_confirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }
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

      navigate("/client/dashboard");

    } catch (error) {
      console.error(error);
    }
  };

  return { Handlelogincli, handleGoogleLogin, handleregistercli };
};
