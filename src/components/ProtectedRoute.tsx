import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/useAuth";

const ProtectedRoute = () => {
    const user = useAuth();

    // Verifica si el usuario está autenticado y tiene el email correcto
    if (!user || user.email !== "gemdelle@twitch.com") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
