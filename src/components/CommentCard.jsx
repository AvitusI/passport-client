/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { Avatar } from "@nextui-org/react"
import { SendHorizonal } from "lucide-react" 

import { useUser } from "../context/UserContext"
import { queryClient } from "../main"

const CommentCard = ({ postId }) => {

  const { user } = useUser()
  
  const [message, setMessage] = useState("")

  const sendComment = async (sentData) => {
    const response = await axios.post(
        `http://localhost:5000/api/${postId}/comments`,
        sentData,
        { withCredentials: true }
    )
    return response.data
}

  const { mutate, isPending } = useMutation({
    mutationFn: sendComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId], { refetchActive: true })
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const submit = () => {
    mutate({ content: message })
    setMessage("")
  }

  return (
    <div className="rounded-lg bg-white flex flex-col p-2 sm:p-4 gap-4 border-2 border-orange-500 mb-6">
          <div className="flex justify-start items-center">
              <Avatar src={user.avatar} className="size-10 mr-3" />
              <h1 className="text-2xl font-bold text-black">{user.username}</h1>
          </div>
          <div className="mt-2  border-b-2 border-black">
            <textarea
              placeholder="Your thoughts?"
              className="placeholder-black/75 w-full outline-none bg-white rounded text-black"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            /> 
          </div>
          <div className="mt-2 mb-1 flex justify-between px-2 py-1">
            <div></div>
            <button
                  className={`${(!message || isPending) ? "hidden" : "inline-flex"} items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-white bg-orange-500 hover:bg-gray-300 focus:outline-none`}
                  onClick={submit}
              >
                  <SendHorizonal />
                </button>
          </div>
    </div>
  )
}

export default CommentCard