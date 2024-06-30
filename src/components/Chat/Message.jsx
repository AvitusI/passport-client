/* eslint-disable react/prop-types */
const Message = ({ message, user }) => {
  return (
    <div className="chat-message">
        <div className={`flex ${message.sender.username === user.username ? "items-end" : "items-end justify-end"}`}>
                    <div className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 ${message.sender.username === user.username ? "items-start" : "items-end"}`}>
                    <div>
                                <span className={`px-4 py-2 rounded-full inline-block ${message.sender.username === user.username ? "bg-gray-200 text-gray-600 rounded-bl-none" : "bg-red-500 text-white rounded-br-none"}`}>
                                      {message.content}
                                      <span className="flex justify-end mt-1 text-xs font-light italic">{message.createdAt}</span>
                            </span>
                      </div>
                    </div>
                </div>
        </div>
  )
}

export default Message