/* eslint-disable react/prop-types */
import { Undo2 } from "lucide-react"

import SingleChat from "./SingleChat"
import ChatInput from "./ChatInput"
import { useUser } from "../../context/UserContext"
import { Avatar } from "@nextui-org/react"

const ChatBox = () => {

    // use the selectedChat to fetch the messages and pass it to the SingleChat component (nope)
    const { user, selectedChat, setSelectedChat } = useUser()
    
    const otherUser = selectedChat?.users?.filter((chatuser) => chatuser.username !== user.username)[0]

  return (
                <div
                        className={`bg-black text-white flex-1 p:2 sm:pb-6 justify-between flex-col h-screen ${selectedChat ? "flex sm:w-2/3" : "hidden sm:flex sm:w-2/3"}`}
    >
      {!selectedChat ? (
                <div className="flex justify-center items-center text-3xl text-center h-full w-full">
                    <p className="text-white">Select a chat to start messaging</p>
                </div>
      ) : (
          <>
                              <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
                                <div className="flex items-center space-x-4">
                                  <Avatar
                                        src={otherUser?.avatar}
                                        className="cursor-pointer"
                                        size="lg"
                                  />
                                  <div className="flex flex-col leading-tight">
                                      <div className="text-xl mt-1 flex items-center">
                                      <span className="text-orange-500 mr-3">{otherUser?.username}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                      <button
                                          className={`inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-300 hover:bg-gray-400 focus:outline-none sm:hidden`}
                                          onClick={() => setSelectedChat("")}
                                      >
                                          <Undo2 />
                                      </button>
                                  </div>
                              </div>

                              {/* messages start here */}
                              {/* Goes into SingleChat component */}

                              <SingleChat />
                              {/* messages end here */}

                              {/* Goes into the ChatInput component */}
                          <ChatInput selectedChat={selectedChat} /> 
                        </>
                      )}
                      </div>

  )
}

export default ChatBox