import { Outlet, Navigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

import { useUser } from "../context/UserContext";

export default function PrivateRoute() { 
    const { user, loading } = useUser();

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col gap-2 items-center">
                <RingLoader color="orange" />
                <span className="text-xl">Just a moment...</span>
            </div>
        </div>
    )


    return user ? <Outlet /> : <Navigate to="/" />
}