/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { Heart, MessageSquareMore } from "lucide-react"
import { Avatar } from "@nextui-org/react"


const Post = ({ post }) => {
  return (
      <div className="flex flex-col bg-white text-black p-4 rounded-lg mb-6 sm:mb-10 border-2 border-orange-500">
          <div className="flex justify-start items-center mb-2">
              <Avatar src={post.author.avatar} alt="avatar" className="size-10 mr-3" />
              <p className="font-semibold text-2xl">{post.author.username }</p>
          </div>
          <div className="flex flex-col mb-3 border-b-2 p-4">
            <p className="text-sm mb-1">{post.content}</p>
            {post.pic && (
              < img src={post.pic} alt="post" className="object-cover rounded-md w-full size-40" />
            )}
          </div>
          <div className="flex justify-between p-4">
              <div><Heart /></div>
              <Link to={`/post/${post._id}`}>
                  <MessageSquareMore />
                </Link>
          </div>
    </div>
  )
}

export default Post