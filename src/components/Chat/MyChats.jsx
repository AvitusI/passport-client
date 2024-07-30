/* eslint-disable react/prop-types */
import { SearchIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Spinner } from "@nextui-org/react"

import { useUser } from "../../context/UserContext"
import UserChat from "./UserChat"

// xl:w-64 ln-12
// fetch the chats here
// use the userId to fetch the chats

const fetchChats = async () => {
    const { data } = await axios.get("http://localhost:5000/api/chat", { withCredentials: true })
    return data
} 


const MyChats = () => {

    const { user, selectedChat } = useUser()

    const { data: chats , status, error } = useQuery({
        queryKey: ["chats"],
        queryFn: fetchChats
    })

    return status === "pending" ? (
        <div className="flex items-center justify-center">
            <Spinner size="large" />
        </div>
    ) : status === "error" ? (
            <div className="flex items-center justify-center text-3xl text-black">
                {error.message}
            </div>
    ) : (
      <div className={`border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:border-r xl:border-gray-200 bg-gray-50 w-full ${selectedChat ? "hidden sm:block sm:w-1/3" : "block sm:w-1/3"}`}>
                              
                              <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                                  <div className="h-full relative">
                                      <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-6">
                                          <div className="flex-shrink-0">
                                              <img
                                                  className="h-12 w-12 rounded-full"
                                                  src={user.avatar}
                                              />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                              <a href="#" className="focus:outline-none">
                                                  <span className="absolute inset-0" />
                                                    <p className="text-sm font-bold text-red-600">{user.username}</p>
                                                  <p className="text-sm text-gray-500 truncate">You</p>
                                              </a>
                                          </div>
                                      </div>

                                      <div className="mb-6">
                                          <div className="relative">
                                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                  <SearchIcon />
                                              </div>
                                              <input
                                                  name="search"
                                                  className="focus:ring-red-500 focus:border-red-500 focus:outline-none block w-full pl-10 sm:text-sm border-gray-100 rounded-full p-2 border"
                                              />
                                          </div>
                                      </div>
                                    {/* SEARCH BOX END */}
                  
                                      {/* Individual chats rendered here */}
                                        {chats.map((chat) => (
                                            <UserChat key={chat.id} chat={chat} />
                                        ))}
                  
                                </div>
                              </div>
        </div>

  )
}

export default MyChats