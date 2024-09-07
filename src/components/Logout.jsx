import { useNavigate } from "react-router-dom";
import { Power } from "lucide-react";

import { useUser } from "../context/UserContext";

export const Logout = () => {

    const { updateUser } = useUser();
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const result = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    accept: 'application/json'
                }
            })
            
            if (result.status === 200) {
                updateUser(null)
                navigate('/')
            } else {
                console.error('Logout failed')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div
            onClick={handleLogout}
            className="rounded-full p-6 bg-gray-900 cursor-pointer hover:bg-gray-700"
        >
            <div className="flex justify-start items-center gap-4">
                <Power size={24} color="red" />
                <span className="text-xl text-red-600 hover:bg-red-700">
                    Logout
                </span>
            </div>
        </div>
    )
}