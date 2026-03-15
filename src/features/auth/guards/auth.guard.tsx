import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";

type Props = {
  redirectTo?: string;
};

const ProtectedRoute = ({ redirectTo = "/404" }: Props) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
