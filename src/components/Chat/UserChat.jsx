/* eslint-disable react/prop-types */
import { useUser } from "../../context/UserContext"


const UserChat = ({ chat }) => {

  const { user, setSelectedChat } = useUser()
  
  const otherUser = chat.users.filter((chatUser) => chatUser.username !== user.username)[0]
  console.log(otherUser)

  return (
      <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
            <div className="flex-shrink-0">
                    <img
                            className="h-10 w-10 rounded-full"
                            src={`${otherUser.avatar}`}
                       />
              </div>
              <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none" onClick={() =>setSelectedChat(chat) }>
                      <div className="flex items-center justify-between flex-shrink-0">
                          <p className="text-sm font-bold text-red-600">{otherUser.username}</p>
                          <div className="text-gray-400 text-xs">
                              {chat?.latestMessage?.createdAt}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 truncate">{chat.latestMessage ? chat.latestMessage.content : "No messages"}</p>
                            <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0 hidden">
                                2
                            </div>
                        </div>
                  </a>
              </div>
      </div>
  )
}

export default UserChat