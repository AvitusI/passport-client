/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { socket } from "../utils";
import { groupByUser, transformNotification } from "../utils/messageNotification";

const UserContext = createContext();

const UserProvider = props => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [selectedChat, setSelectedChat] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [messageNotification, setMessageNotification] = useState([]);
    const [refetchFlag, setRefetchFlag] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("https://shownext-tav7bg80.b4a.run/api/auth/status", {
                    credentials: "include",
                    headers: {
                        accept: 'application/json',
                    }
                });
                const userData = await result.json();
                setUser(userData);
                console.log(userData);
                if (userData) {
                    socket.emit("join_notifications", userData._id);
                }

                const msgNotification = await fetch(`https://shownext-tav7bg80.b4a.run/api/messagenotify/${userData._id}`, {
                    credentials: "include",
                    headers: {
                        accept: 'application/json,'
                    }  
                });
                const msgNotificationData = await msgNotification.json();
                const groupedNotification = groupByUser(msgNotificationData);
                const transformedNotifications = transformNotification(groupedNotification)
                setMessageNotification(transformedNotifications)

                const allNotifications = await fetch(`https://shownext-tav7bg80.b4a.run/api/notifications/${userData._id}`, {
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

        () => { socket.off("notification").on("notification", (notification) => { setNotifications([notification, ...notifications]) }) }

    }, [selectedChat, setSelectedChat, refetchFlag, notifications])

    const updateUser = user => {
        setUser(user);
    }

    const refetchNotifications = () => {
        setRefetchFlag((prev) => !prev);
    }

    const value = {
        user,
        updateUser,
        loading,
        notifications,
        setNotifications,
        selectedChat,
        setSelectedChat,
        chatMessages,
        setChatMessages,
        messageNotification,
        setMessageNotification,
        refetchNotifications
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