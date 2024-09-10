/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { SendHorizontal } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { socket } from "../../utils"

import { queryClient } from "../../main"
import { useUser } from "../../context/UserContext"

const ChatInput = ({ selectedChat }) => {

  const [sendMessage, setSendMessage] = useState("")

  const { user, chatMessages, setChatMessages } = useUser()

  const sendMsg = async (messageObj) => { 
    const { data } = await axios.post('http://localhost:5000/api/messages',  messageObj , { withCredentials: true })
    return data
  }
  
  const { mutate } = useMutation({
    mutationFn: sendMsg,
    onSuccess: async () => {
      queryClient.invalidateQueries(['messages'], { refetchActive: true })
    },
    onError: (error) => { 
      console.log(error)
    }
  })

  const awaitNotification = () => {
    setTimeout(() => { socket.emit("new_notification") }, 1000)
  }

  useEffect(() => { 
    socket.off("receive_message").on("receive_message", (message) => { 
    const currentMessages = queryClient.getQueryData(["messages-fetched", selectedChat._id])
    console.log(currentMessages)
     queryClient.setQueryData(["messages-fetched", selectedChat._id], [...currentMessages, message])
    })
  }, [selectedChat])

  const submit = async  () => {
    const messageObj = {
      content: sendMessage,
      chatId: selectedChat._id
    }
    setChatMessages(
      [...chatMessages,
        {
          ...messageObj,
          sender: user,
          _id: new Date(Date.now()),
          createdAt: new Date(Date.now())
        }]
    )

    const message = {
        _id: new Date(Date.now()),
        sender: user,
        content: sendMessage,
        createdAt: new Date(Date.now()),
        chatId: selectedChat._id
    }
    
    await socket.emit("send_message", message)
    awaitNotification()
    setSendMessage("")
    mutate(messageObj)
  }

  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2">
        <div className="relative flex">
            <textarea
                placeholder="Write something"
                rows="1"
                className="border-2 ring-2 focus:ring-orange-500   focus:border-orange-500 w-full text-white pl-12 pr-12 bg-gray-800 rounded-full py-3 resize-none"
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
              ></textarea>
              <span className={`absolute inset-y-0 items-center right-0 ${sendMessage ? "flex" : "hidden"}`}>
                <button
                      className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={submit}
                >
                  <SendHorizontal />
                </button>
              </span>
          </div>
      </div>
  )
}

export default ChatInput