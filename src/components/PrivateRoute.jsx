import { Outlet, Navigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import { Spinner } from "@nextui-org/react";

export default function PrivateRoute() { 
    const { user, loading } = useUser();

    if (loading) return (
        <div className="h-screen flex justify-center items-center">
            <Spinner size="lg"/>
        </div>
    )

    return user ? <Outlet /> : <Navigate to="/" />
}