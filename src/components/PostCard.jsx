import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { ImageUp, SendHorizontal } from "lucide-react"
import { Avatar, Button } from "@nextui-org/react"
import { Link } from "react-router-dom"

import { useUser } from "../context/UserContext"
import { queryClient } from "../main"

const sendPost = async (sentData) => {
    const response = await axios.post(
        "http://localhost:5000/api/posts",
        sentData,
        { withCredentials: true }
    )
    return response.data
}

const PostCard = () => {

    const [message, setMessage] = useState("")

    const { user } = useUser()

    const { mutate, isPending } = useMutation({
        mutationFn: sendPost,
        onSuccess: () => {
            queryClient.invalidateQueries(['items'], { refetchActive: true })
        },
        onError: (error) => {
            console.log(error)
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
                            placeholder="Any thoughts today?"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        ></textarea>
                    </div>

                    <div className="px-2 pt-2">
              <div className="flex items-center justify-between p-4 border-t-2 border-t-gray-300">
                            <Link to="/post">
                                <Button
                                    isIconOnly
                                    radius="full"
                                    className="bg-white text-black hover:bg-gray-300 cursor-pointer"
                                >
                                    <ImageUp size={24} />
                                </Button>
                            </Link>
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

export default PostCard

// ImageUp SendHorizontal