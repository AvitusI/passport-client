/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

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

                const allNotifications = await fetch(`http://localhost:5000/api/notifications/${userData._id}`, {
                    credentials: "include",
                    headers: {
                        accept: 'application/json',
                    }
                });
                const allNotificationsData = await allNotifications.json()
                setNotifications(allNotificationsData);

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