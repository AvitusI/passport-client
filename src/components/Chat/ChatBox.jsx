import { SearchIcon, Heart, Undo2 } from "lucide-react"

import SingleChat from "./SingleChat"
import ChatInput from "./ChatInput"
import { useUser } from "../../context/UserContext"

const ChatBox = () => {

    // use the selectedChat to fetch the messages and pass it to the SingleChat component (nope)
    const { user, selectedChat, setSelectedChat } = useUser()
    
    const otherUser = selectedChat.users?.filter((chatuser) => chatuser.username !== user.username)[0]

  return (
                <div
                        className={`flex-1 p:2 sm:pb-6 justify-between flex-col h-screen ${selectedChat ? "flex sm:w-2/3" : "hidden sm:flex sm:w-2/3"}`}
    >
      {!selectedChat ? (
                <div className="flex justify-center items-center text-3xl text-center h-full w-full">
                    <p className="text-black">Select a chat to start messaging</p>
                </div>
      ) : (
          <>
                              <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
                                <div className="flex items-center space-x-4">
                                  <img
                                      src={otherUser.avatar}
                                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer"
                                  />
                                  <div className="flex flex-col leading-tight">
                                      <div className="text-xl mt-1 flex items-center">
                                      <span className="text-gray-700 mr-3">{otherUser.username}</span>
                                          <span className="text-green-500">
                                              <svg width={10} height={10}>
                                                  <circle cx={5} cy={5} r={5} fill="currentColor" />
                                              </svg>
                                          </span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                      <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                          <SearchIcon />
                                      </button>
                                      <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                          <Heart />
                                      </button>
                                      <button
                                          className={`inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none sm:hidden`}
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
                          <ChatInput /> 
                        </>
                      )}
                      </div>

  )
}

export default ChatBox