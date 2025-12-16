import { createContext } from "react";

interface Usuario {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  Handlelogincli: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  handleGoogleLogin: () => void;
  handleregistercli: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    identification_type_code: string,
    number: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
