import { useState } from "react"
import { SendHorizontal, Mic } from "lucide-react"

const ChatInput = () => {

const [sendMessage, setSendMessage] = useState("")

  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2">
                                  <div className="relative flex">
                                      <span className="absolute inset-y-0 flex items-center">
                                          <button
                                            className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300"
                                          >
                                            <Mic />
                                          </button>
                                      </span>
                                      <textarea
                                          placeholder="Write something"
                                          rows="1"
                                          className="focus:ring-red-500   focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 pr-12 bg-gray-100 rounded-full py-3 border-gray-200 resize-none"
                                          value={sendMessage}
                                          onChange={(e) => setSendMessage(e.target.value)}
                                      ></textarea>
                                      <span className={`absolute inset-y-0 items-center right-0 ${sendMessage ? "flex" : "hidden"}`}>
                                          <button
                                            className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out bg-red-500 hover:bg-red-600 text-white"
                                          >
                                            <SendHorizontal />
                                          </button>
                                      </span>

                                  </div>
        </div>
  )
}

export default ChatInput