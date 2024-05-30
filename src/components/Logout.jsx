import { useNavigate } from "react-router-dom";

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
                navigate('/signin')
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
            className="py1 px-2 rounded bg-black text-white hover:bg-black/15"
        >
            Logout
        </button>
    )
}

export default Logout;