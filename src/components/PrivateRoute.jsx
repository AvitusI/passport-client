import { Outlet, Navigate } from "react-router-dom";

import { useUser } from "../context/UserContext";

export default function PrivateRoute() { 
    const { user, loading } = useUser();

    if (loading) return <p>Loading...</p>
    console.log(user)

    return user ? <Outlet /> : <Navigate to="/" />
}