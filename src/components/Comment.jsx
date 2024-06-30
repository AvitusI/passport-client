/* eslint-disable react/prop-types */
import { Heart } from "lucide-react"
import { Avatar } from "@nextui-org/react"

const Comment = ({ comment }) => {
  return (
      <div className="flex gap-2 p-2 mb-2 sm:mb-4 items-start">
          <Avatar isBordered src={comment.userId.avatar} alt="avatar" />
          <div className="bg-white p-2 flex flex-col rounded-xl rounded-tl-none text-black w-full border-orange-500">
              <p className="text-sm mb-3 font-semibold">{comment.userId.username}</p>
              <p className="text-sm mb-3 font-light">{comment.content}</p>
              <Heart size={20} />
          </div>
    </div>
  )
}

export default Comment