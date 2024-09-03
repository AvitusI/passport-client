/* eslint-disable react/prop-types */
import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"
import { Heart, Reply, SendHorizontal, Trash2 } from "lucide-react"
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    Avatar,
    Button,
} from "@nextui-org/react"

import { queryClient } from "../main"
import { formatTimeDifference } from "../utils/formatTime"

const fetchReplies = async ({ queryKey }) => {
    const [, commentId] = queryKey
    const { data } = await axios.get(`http://localhost:5000/api/comments/replies/${commentId}`, { withCredentials: true })
    return data
}

const replyComment = async (sentData) => {
    const { data } = await axios.post("http://localhost:5000/api/comments/reply", sentData, { withCredentials: true })
    return data
}
 
const deleteReply = async (sentData) => { 
    // Axios handles delete requests differently from other requests
    const { data } = await axios.delete("http://localhost:5000/api/reply/delete",  { data: sentData, withCredentials: true })
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

    const { mutate: mutateReply } = useMutation({
        mutationFn: replyComment,
        onSuccess: () => {
            queryClient.invalidateQueries(["replies", commentId], { refetchActive: true })
        },
        onError: () => {
            toast.error("Failed to add reply")
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
                                                <div key={reply._id} className="p-4">
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
                                                                    <span>{reply?.likes.length > 0 ? reply?.likes.length : null}</span>
                                                                    <Heart size={16} fill="red" />
                                                                </div>
                                                                <div className="flex justify-center items-center">
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