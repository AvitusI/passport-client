import { useNavigate } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { RingLoader } from "react-spinners"
import { Avatar } from "@nextui-org/react"

import { useUser } from "../context/UserContext"

const getNotifications = async ({ queryKey }) => {
    const [, userId] = queryKey
    const { data } = await axios.get(`https://passport-server-production-a778.up.railway.app/api/notificationsAll/${userId}`, { withCredentials: true })
    return data
}

const markAsRead = async (sentData) => { 
    const { data } = await axios.put(`https://passport-server-production-a778.up.railway.app/api/notifications/`, sentData,{ withCredentials: true })
    return data
}

export default function Notifications() {
    
    const navigate = useNavigate()

    const { user, refetchNotifications } = useUser()

    const userId = user._id

    const { data, status } = useQuery({
        queryKey: ["notifications", userId],
        queryFn: getNotifications
    })

    const { mutate } = useMutation({
        mutationFn: markAsRead,
    })

    const handleRedirect = (notification) => {
        mutate({ id: notification._id })
        refetchNotifications()
        switch (notification.type) {
            case "FollowNotification":
                navigate(`/profile/${notification.followerId._id}`)
                break;
            case "LikePostNotification":
                navigate(`/post/${notification.postId}`)
                break;
            case "LikeCommentNotification":
                navigate(`/post/${notification.commentId.postId}`)
                break;
            case "LikeReplyNotification":
                navigate(`/post/${notification.replyId.commentId.postId}`)
                break;
            case "CommentNotification":
                navigate(`/post/${notification.postId}`)
                break;
            case "ReplyNotification":
                navigate(`/post/${notification.commentId.postId}`)
                break; 
        }
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
                <p className="text-2xl">All Notifications</p>
            </div>
            {data.map((notification) => (
                <div
                    key={notification._id}
                    className="max-w-[400px] relative rounded-lg px-2 py-2 grid grid-cols-custom gap-2 items-center mb-3 hover:bg-orange-500 transition ease-in-out duration-300 cursor-pointer"
                    onClick={() => handleRedirect(notification)}
                >
                    <div className="flex-shrink-0">
                        <Avatar
                            src={notification?.followerId?.avatar || notification?.likerId?.avatar || notification?.commenterId?.avatar || notification?.replierId?.avatar}
                            alt="avatar"
                            size="sm"
                        />
                    </div>
                    <div className="grid grid-cols-customized items-center">
                        <span className="text-sm text-default-600">{notification?.message}</span>
                        <span className={`text-red-600 ${notification?.read ? "hidden" : ""}`}>
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