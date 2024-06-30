// import { Link } from "react-router-dom"
import { Avatar } from "@nextui-org/react"
import { SendHorizonal } from "lucide-react" 

import { useUser } from "../context/UserContext"

const CommentCard = () => {

    const { user } = useUser()

  return (
    <div className="rounded-lg bg-white flex flex-col p-2 sm:p-4 gap-4 border-2 border-orange-500 mb-6">
          <div className="flex justify-start items-center">
              <Avatar src={user.avatar} className="size-10 mr-3" />
              <h1 className="text-2xl font-bold text-black">{user.username}</h1>
          </div>
          <div className="mt-2  border-b-2 border-black">
              <textarea placeholder="Your thoughts?" className="placeholder-black/75 w-full outline-none bg-white rounded text-black" /> 
          </div>
          <div className="mt-2 mb-1 flex justify-between px-2 py-1">
              <div></div>
              <SendHorizonal size={24} className="text-black" />
          </div>
    </div>
  )
}

export default CommentCard