/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const UserContext = createContext();

const UserProvider = props => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [selectedChat, setSelectedChat] = useState("")

    // Also fetch notifications in here

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:5000/api/auth/status", {
                    credentials: "include",
                    headers: {
                        accept: 'application/json',
                    }
                });
                const userData = await result.json();
                setUser(userData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    const updateUser = user => {
        setUser(user);
    }

    /*
    const addNotification = notification => { 
        setNotifications([...notifications, notification])
    } */

    const value = {
        user,
        updateUser,
        loading,
        notifications,
        setNotifications,
        selectedChat,
        setSelectedChat
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
};

const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }

    return context
}

export { UserProvider, useUser }