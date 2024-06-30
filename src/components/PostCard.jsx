import { ImageUp, SendHorizonal } from "lucide-react"
import { Avatar } from "@nextui-org/react"
import { Link } from "react-router-dom"

import { useUser } from "../context/UserContext"

const PostCard = () => {

    const { user } = useUser()

  return (
      <div className="rounded-lg bg-white flex flex-col p-2 sm:p-4 gap-4 border-2 border-orange-500 mb-6">
          <div className="flex justify-start items-center">
              <Avatar src={user.avatar} className="size-10 mr-3" />
              <h1 className="text-2xl font-bold text-black">{user.username}</h1>
          </div>
          <div className="mt-2  border-b-2 border-black">
              <textarea placeholder="What's on your mind today?" className="placeholder-black/75 w-full outline-none bg-white rounded text-black" /> 
          </div>
          <div className="mt-2 mb-1 flex justify-between px-2 py-1">
              <Link to="/post">
                  <ImageUp size={24} className="text-black" />
              </Link>
              <SendHorizonal size={24} className="text-black" />
          </div>
    </div>
  )
}

export default PostCard

// ImageUp SendHorizontal