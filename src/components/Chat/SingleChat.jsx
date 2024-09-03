import ScrollableFeed from "react-scrollable-feed"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Spinner } from "@nextui-org/react"

import Message from "./Message";
import { useUser } from "../../context/UserContext"
import { useEffect } from "react";

// fetch the messages from individual chat here, use the selectedChat context to fetch the messages, OR
// receive chatId as props from ChatBox component

const fetchMessages = async ({ queryKey }) => {
    const [, chatId] = queryKey
    const { data } = await axios.get(`http://localhost:5000/api/messages/${chatId}`, { withCredentials: true })
    return data
}

const SingleChat = () => {

    const { user, selectedChat, chatMessages, setChatMessages } = useUser()

    const chatId = selectedChat._id

    const { data, status, error, isSuccess } = useQuery({
        queryKey: ["messages-fetched", chatId],
        queryFn: fetchMessages,
    })

    // set the chat messages in the context
    useEffect(() => {
        if (isSuccess) {
            setChatMessages(data);
            console.log(data)
        }
    }, [data, isSuccess, setChatMessages])

    return status === "pending" ? (
        <div className="h-full w-full flex items-center justify-center">
            <Spinner size="large" />
        </div>
    ) : status === "error" ? (
            <div className="h-full w-full flex items-center justify-center text-3xl text-black">
                {error.message}
            </div>
    ) : (
            <ScrollableFeed
                className="message flex flex-col space-y-5 p-1 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-hidden scrollbar-track-blue-lighter scrollbar-w-2 scrollbar-touch"
            >
                    {chatMessages.map((message) => (
                        <Message key={message._id} message={message} user={user} />
                    ))}
            </ScrollableFeed>
  )
}

export default SingleChat