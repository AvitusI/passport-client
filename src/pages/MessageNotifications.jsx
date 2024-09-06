import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Avatar } from "@nextui-org/react"
import { RingLoader} from "react-spinners"

import { useUser } from "../context/UserContext"
import { groupByUser, transformNotification } from "../utils/messageNotification"


const getMessageNotifications = async ({ queryKey }) => { 
    const [, userId] = queryKey
    const { data } = await axios.get(`http://localhost:5000/api/messagenotifyAll/${userId}`, { withCredentials: true })
    return data
}

export default function MessageNotifications() { 

     //const groupedNotification = groupByUser(msgNotificationData);
    //const transformedNotifications = transformNotification(groupedNotification)

    const navigate = useNavigate()

    const { user } = useUser()

    const userId = user._id

    const { data, status } = useQuery({
        queryKey: ["messageNotifications", userId],
        queryFn: getMessageNotifications
    })

    const groupedNotification = groupByUser(data);
    const transformedNotifications = transformNotification(groupedNotification)

    const handleNavigate = () => { 
        navigate("/chat")
    }


    return status === "pending" ? (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col gap-2 items-center">
                <RingLoader color="orange" />
                <span className="text-xl">Just a moment...</span>
            </div>
        </div>
    )
        : status === "error" ? (
            <div className="h-screen flex items-center justify-center">
                <span className="text-2xl">An Error Occured, try to refresh the page</span>
            </div>
        )
            :
        (
        <div className="min-h-screen flex justify-center p-2">
        <div className="flex flex-col gap-2 w-[400px] text-white">
            <div className="m-4 text-center">
                <p className="text-2xl">All Message Notifications</p>
            </div>
            {transformedNotifications.map((notification) => (
                <div
                    key={notification._id}
                    className="max-w-[400px] relative rounded-lg px-2 py-2 grid grid-cols-custom gap-2 items-center mb-3 hover:bg-orange-500 cursor-pointer"
                    onClick={handleNavigate}
                >
                    <div className="flex-shrink-0">
                        <Avatar src={notification?.avatar} alt="avatar" size="sm" />
                    </div>
                    <div className="grid grid-cols-customized items-center">
                        <span className="text-sm text-default-600">{notification?.message}</span>
                        <span className={`text-red-600 hidden`}>
                            <svg width={10} height={10}>
                                <circle cx={5} cy={5} r={5} fill="currentColor" />
                            </svg>
                        </span>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}