/* eslint-disable react/prop-types */
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Avatar, Button } from "@nextui-org/react"
import { Trash2 } from "lucide-react"

import LikeButton from "./LikeButton"
import { useUser } from "../context/UserContext"
import { queryClient } from "../main"
import { formatTimeDifference } from "../utils/formatTime"
import { toast } from "react-toastify"

const deleteReply = async (sentData) => { 
    // Axios handles delete requests differently from other requests
    const { data } = await axios.delete("https://passport-server-production-a778.up.railway.app/api/reply/delete",  { data: sentData, withCredentials: true })
    return data
}

export const ReplyComp = ({ reply }) => {

    const { user, refetchNotifications } = useUser()

    const likeStatus = reply.likes.some((like) => like._id === user._id)
    const isAuthor = reply.userId._id === user._id
    const commentId = reply.commentId._id

    const [liked, setLiked] = useState(likeStatus)

    const sendLike = async (sentData) => {
        if (likeStatus) {
            const { data } = await axios.post("https://passport-server-production-a778.up.railway.app/api/reply/unlike", sentData, { withCredentials: true })
            return data
        }
        else {
            const { data } = await axios.post("https://passport-server-production-a778.up.railway.app/api/reply/like", sentData, { withCredentials: true })
            return data
        }
    }

    const { mutate: mutateLike } = useMutation({
        mutationFn: sendLike,
        onSuccess: () => {
            refetchNotifications()
            queryClient.invalidateQueries(['post', reply.commentId.postId], { refetchActive: true })
        },
        onError: (error) => { 
        console.log(error)
        }
    })

    const { mutate: mutateDelete, isPending } = useMutation({
        mutationFn: deleteReply,
        onSuccess: () => {
            queryClient.invalidateQueries(["replies", commentId], { refetchActive: true })
        },
        onError: (error) => {
            console.log(error)
            toast.error("Failed to delete reply")
        }
    })

    const likeAction = () => {
        setLiked(!liked)
        mutateLike({ replyId: reply._id })
    }
    
    return (
        <div className="p-4">
            <div className="flex justify-start gap-4">
                <div className="flex-1">
                    <Avatar src={reply.userId.avatar} alt="avatar" size="sm"/>
                </div>
                <div className="flex flex-col gap-4 w-full pt-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold leading-none text-default-800">
                            {reply.userId.username}
                        </span>
                        <span className="text-xs italic text-default-800">{formatTimeDifference(new Date(reply.createdAt))}</span>
                    </div>
                    <p className="text-sm">{reply.content}</p>
                    <div className="grid grid-cols-2">
                        <div className="flex justify-center items-center gap-2">
                            <span className="text-xs font-semibold">{reply?.likes.length > 0 ? reply?.likes.length : null}</span>
                            <LikeButton liked={liked} action={likeAction} isReply={true} />
                        </div>
                        <div className={`flex justify-center items-center ${isAuthor ? "" : "hidden"}`}>
                            <Button
                                isIconOnly
                                className="text-orange-500 hover:text-white bg-white hover:bg-orange-500"
                                radius="full"
                                isDisabled={isPending}
                                onClick={() => mutateDelete({ id: reply._id })}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}