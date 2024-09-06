/* eslint-disable react/prop-types */
import { DateTime } from "luxon"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { useUser } from "../../context/UserContext"
import { socket } from "../../utils"
import { queryClient } from "../../main"

const messageNotificationsRead = async (sentData) => {
  const { data } = axios.post("http://localhost:5000/api/notifyread", sentData, { withCredentials: true })
  return data
}

const UserChat = ({ chat }) => {

  const { user, setSelectedChat } = useUser()
  
  const otherUser = chat.users.filter((chatUser) => chatUser.username !== user.username)[0]

  const { mutate } = useMutation({
    mutationFn: messageNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"])
    }
  })
  
  const joinChat = () => {
    setSelectedChat(chat)
    console.log(chat)
      mutate({ chatId: chat._id })
      socket.emit("join_chat", chat._id)
  }

  return (
      <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-800 focus-within:ring-2 mb-3 hover:bg-gray-800">
            <div className="flex-shrink-0">
                    <img
                            className="h-10 w-10 rounded-full"
                            src={`${otherUser.avatar}`}
                       />
              </div>
              <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none" onClick={joinChat}>
                      <div className="flex items-center justify-between flex-shrink-0">
                          <p className="text-sm font-bold text-orange-500">{otherUser.username}</p>
                          <div className="text-gray-400 text-xs">
                          {chat?.latestMessage ? DateTime.fromJSDate(new Date(chat?.latestMessage?.createdAt)).toLocaleString({
                              hour: 'numeric',
                              minute: '2-digit',
                              meridiem: true
                            }) : undefined }
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 truncate">{chat.latestMessage ? chat.latestMessage.content : "No messages"}</p>
                            <div className={`text-white text-xs px-1 py-0 ${(chat?.latestMessage?.read === false && (chat?.latestMessage.sender._id !== user._id)) ? "block" : "hidden"}`}>
                                          <span className="text-red-600">
                                            <svg width={10} height={10}>
                                                <circle cx={5} cy={5} r={5} fill="currentColor" />
                                            </svg>
                                          </span>
                            </div>
                        </div>
                  </a>
              </div>
      </div>
  )
}

export default UserChat