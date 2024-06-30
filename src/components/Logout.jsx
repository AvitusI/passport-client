import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { useUser } from "../context/UserContext";

const Logout = () => {

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
        <button
            onClick={handleLogout}
            className="flex justify-center items-center py-1 px-2 space-x-3 rounded-full bg-orange-500 text-white hover:bg-orange-700"
        >
            <LogOut />
            <span>Logout</span>
        </button>
    )
}

export default Logout;