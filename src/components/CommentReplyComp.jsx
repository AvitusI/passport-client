/* eslint-disable react/prop-types */
import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"
import { Heart, Reply, SendHorizontal } from "lucide-react"
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    Avatar,
} from "@nextui-org/react"

import { socket } from "../utils"
import { queryClient } from "../main"
import { formatTimeDifference } from "../utils/formatTime"
import { ReplyComp } from "./ReplyComp"

const fetchReplies = async ({ queryKey }) => {
    const [, commentId] = queryKey
    const { data } = await axios.get(`https://shownext-tav7bg80.b4a.run/api/comments/replies/${commentId}`, { withCredentials: true })
    return data
}

const replyComment = async (sentData) => {
    const { data } = await axios.post("https://shownext-tav7bg80.b4a.run/api/comments/reply", sentData, { withCredentials: true })
    return data
}
 
export const CommentReplyComp = ({
    comment
}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [sendMessage, setSendMessage] = useState("")

    const commentId = comment._id;

    const { data, status } = useQuery({
        queryKey: ["replies", commentId],
        queryFn: fetchReplies,
    })

    const awaitNotification = () => {
        setTimeout(() => { socket.emit("new_notification") }, 1000)
    }

    const { mutate: mutateReply } = useMutation({
        mutationFn: replyComment,
        onSuccess: () => {
            awaitNotification()
            queryClient.invalidateQueries(["replies", commentId], { refetchActive: true })
        },
        onError: () => {
            toast.error("Failed to add reply")
        }
    })

    const handleReply = () => {
        mutateReply({ content: sendMessage, commentId })
        setSendMessage("")
    }

    return (
        <>
            <div className="flex justify-center items-center gap-2 text-black cursor-pointer" onClick={onOpen}>
                <span className="text-sm">
                    {comment?.replies.length > 0 ? comment?.replies.length : null}
                </span>
                <Reply size={16} />
            </div>
            <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="top"
                    >
                        <ModalContent>
                            <ModalBody>
                                <div className="max-h-[700px] h-auto flex flex-col gap-2 sm:gap-4">
                                    {/** Comment */}
                                    <div className="flex-none p-4 ">
                                        <div className="flex justify-start gap-4">
                                            <div className="flex-1">
                                                <Avatar src={comment.userId.avatar} alt="avatar" />
                                            </div>
                                            <div className="flex flex-col gap-4 w-full">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-md font-semibold leading-none text-default-800">
                                                        {comment.userId.username}
                                                    </span>
                                                    <span className="text-xs italic text-default-800">{formatTimeDifference(new Date(comment.createdAt))}</span>
                                                </div>
                                                <p className="text-md">{comment.content}</p>
                                                <div className="flex justify-between pt-3">
                                                    <div className="flex justify-center items-center gap-2">
                                                        <span>{comment?.likes.length > 0 ? comment?.likes.length : null}</span>
                                                        <Heart size={16} fill="red" />
                                                    </div>
                                                    <div className="flex justify-center items-center gap-2">
                                                        <span>{comment?.replies.length > 0 ? comment?.replies.length : null}</span>
                                                        <Reply size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            {/** Replies */}
                            {status === "pending" ? (<div>Loading...</div>)
                                : status === "error" ? (<div>Error fetching replies</div>)
                                    : (
                                        <div className="flex-1 overflow-y-auto max-h-[300px]">
                                            {data.map((reply) => (
                                                <ReplyComp key={reply._id} reply={reply} />
                                            ))}
                                        </div>
                                    )}
                                    {/* Input */}
                                    <div className="flex-none">
                                        <div className="relative flex">
                                            <textarea
                                                placeholder="Write your reply"
                                                rows="1"
                                                className="focus:outline-none focus:ring-orange-500 focus:ring-2 w-full focus:placeholder-gray-600 text-gray-700 placeholder-gray-500 pl-12 pr-12 bg-gray-200 focus:bg-gray-100 rounded-full py-3 border-gray-200 resize-none"
                                                value={sendMessage}
                                                onChange={(e) => setSendMessage(e.target.value)}
                                            ></textarea>
                                            <span className={`absolute inset-y-0 items-center right-0 ${sendMessage ? "flex" : "hidden"}`}>
                                                <button
                                                    onClick={handleReply}
                                                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out bg-orange-500 hover:bg-orange-600 text-white"
                                                >
                                                    <SendHorizontal />
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
        </>
    )
}