import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Pages/Components/Loader";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()

    if (!loading) {
        return <Loader></Loader>;
    }
    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default PrivateRoutes;