import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  panel: string;
}

export default function PanelRoute({ panel }: Props) {
  const { panels, loading } = useAuth();

  if (loading) return null;

  if (!panels.includes(panel)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}