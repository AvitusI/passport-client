import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios"; 
import { toast } from "react-toastify";
import { Power } from "lucide-react";

import { useUser } from "../context/UserContext";

const logout = async () => {
    const { data } = await axios.post("https://shownext1-7sh63dv9.b4a.run/api/auth/logout", {},  { withCredentials: true })
    return data
}

export const Logout = () => {

    const { updateUser } = useUser()

    const navigate = useNavigate()
    
    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            updateUser(null)
            navigate("/", { replace:  true  })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    const handleLogout = () => {
        mutate()
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