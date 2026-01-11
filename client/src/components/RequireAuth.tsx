import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const RequireAuth = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const location = useLocation();

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
