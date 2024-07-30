/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
//import { useQuery } from "@tanstack/react-query";
//import axios from "axios";

import { groupByUser, transformNotification } from "../utils/messageNotification";

const UserContext = createContext();

const UserProvider = props => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [selectedChat, setSelectedChat] = useState("");
    const [messageNotification, setMessageNotification] = useState([]);

    // Also fetch notifications in here

    useEffect(() => {
        /*
        const msgNotificationFn = async ({ queryKey }) => {
            const [userId,] = queryKey
            const { data } = await axios.get(`http://localhost:5000/api/messagenotify/${userId}`, { withCredentials: true })
            return data;
        } */
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


                /*
               const { data } = useQuery({
                    queryKey: ["messageNotification", userId],
                    queryFn: msgNotificationFn
                }) */

                
                const msgNotification = await fetch(`http://localhost:5000/api/messagenotify/${userData._id}`, {
                    credentials: "include",
                    headers: {
                        accept: 'application/json'
                    }
                });
                const msgNotificationData = await msgNotification.json();
                const groupedNotification = groupByUser(msgNotificationData);
                const transformedNotifications = transformNotification(groupedNotification)
                setMessageNotification(transformedNotifications)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedChat, setSelectedChat])

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
        setSelectedChat,
        messageNotification,
        setMessageNotification
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