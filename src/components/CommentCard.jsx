/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { Avatar, Button } from "@nextui-org/react"
import {  SendHorizontal } from "lucide-react" 

import { useUser } from "../context/UserContext"
import { socket } from "../utils"
import { queryClient } from "../main"

const CommentCard = ({ postId }) => {

  const { user } = useUser()
  
  const [message, setMessage] = useState("")

  const sendComment = async (sentData) => {
    const response = await axios.post(
        `https://shownext1-7sh63dv9.b4a.run/api/${postId}/comments`,
        sentData,
        { withCredentials: true }
    )
    return response.data
  }
  
  const awaitNotification = () => {
    setTimeout(() => { socket.emit("new_notification") }, 1000)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: sendComment,
    onSuccess: () => {
      awaitNotification()
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
    <article className="bg-white max-w-96 rounded-md pb-2">
                    <header className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center font-bold">
                            <span className="mr-2">
                                <Avatar src={user.avatar} alt="avatar" />
                            </span>
                            <h4 className="text-small font-semibold leading-none text-black">{user.username}</h4>
                        </div>
                    </header>

                    <div className="px-4 py-3">
                        <textarea
                            className="w-full p-2 h-16 focus:outline-none bg-white text-black placeholder:text-gray-700"
                            placeholder="What do you think?"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        ></textarea>
                    </div>

                    <div className="px-2 pt-2">
                        <div className="flex justify-end p-4 border-t-2 border-t-gray-300">
                            <Button
                                isIconOnly
                                radius="full"
                                className="bg-orange-500 text-white hover:bg-orange-700 cursor-pointer"
                                isDisabled={!message || isPending}
                                onClick={submit}
                            >
                                <SendHorizontal size={24} />
                            </Button>
                        </div>
                    </div>

          </article>
  )
}

export default CommentCard