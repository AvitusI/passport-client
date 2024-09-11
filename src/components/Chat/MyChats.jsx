/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import {  CircleChevronLeft } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Avatar, Button } from "@nextui-org/react"
import { RingLoader } from "react-spinners"

import { useUser } from "../../context/UserContext"
import UserChat from "./UserChat"
import { SearchModal } from "../SearchComps/SearchModal"

// xl:w-64 ln-12
// fetch the chats here
// use the userId to fetch the chats

const fetchChats = async () => {
    const { data } = await axios.get("https://shownext-tav7bg80.b4a.run/api/chat", { withCredentials: true })
    return data
} 


const MyChats = () => {

    const { user, selectedChat } = useUser()

    const { data: chats , status } = useQuery({
        queryKey: ["chats"],
        queryFn: fetchChats
    })

    return status === "pending" ? (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col gap-2 items-center">
                <RingLoader color="orange" />
                <span className="text-xl">Just a moment...</span>
            </div>
        </div>
    ) : status === "error" ? (
            <div className="flex items-center justify-center text-xl text-black">
                <span>Network error occured. Try refreshing the page.</span>
            </div>
    ) : (
      <div className={`bg-black border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:border-r xl:border-gray-200 w-full ${selectedChat ? "hidden sm:block sm:w-1/3" : "block sm:w-1/3"}`}>
                              <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                                <div className="h-full relative">
                                    <div className="px-2 flex justify-end">
                                        <Link to="/feed">
                                            <Button
                                                isIconOnly
                                                className="bg-orange-500 text-white"
                                            >
                                                <CircleChevronLeft size={24}/>
                                            </Button>
                                        </Link>
                                    </div>
                                      <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-6">
                                          <div className="flex-shrink-0">
                                              <Avatar
                                                    src={user.avatar}
                                                    alt="avatar"
                                                    size="lg"
                                              />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                              <a href="#" className="focus:outline-none">
                                                  <span className="absolute inset-0" />
                                                    <p className="text-sm font-bold text-white">{user.username}</p>
                                                  <p className="text-sm text-gray-500 truncate">You</p>
                                              </a>
                                          </div>
                                      </div>

                                      <div className="mb-6">
                                          <SearchModal isChat />
                                      </div>
                                    {/* SEARCH BOX END */}

                                        {/* Individual chats rendered here */}
                                        <div className="overflow-y-scroll container">
                                            {chats.map((chat) => (
                                                <UserChat key={chat.id} chat={chat} />
                                            ))}
                                        </div>
                  
                                </div>
                              </div>
        </div>

  )
}

export default MyChats