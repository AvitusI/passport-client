/* eslint-disable react/prop-types */
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Avatar } from "@nextui-org/react"

import { useUser } from "../context/UserContext"
import LikeButton from "./LikeButton"
import { queryClient } from "../main"

const Comment = ({ comment }) => {

  const { user } = useUser();

  const likeStatus = comment.likes.some((like) => like._id === user._id)

  console.log(comment)

  const [liked, setLiked] = useState(likeStatus)

  const sendLike = async (sentData) => {
    if (likeStatus) {
      const { data } = await axios.post("http://localhost:5000/api/comments/unlike", sentData, { withCredentials: true })
      return data
    }
    else {
      const { data } = await axios.post("http://localhost:5000/api/comments/like", sentData, { withCredentials: true })
      return data
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: sendLike,
    onSuccess: () => {
      setLiked(!liked)
      queryClient.invalidateQueries(['post', comment.postId], { refetchActive: true })
    },
    onError: (error) => { 
      console.log(error)
    }
  })

  const likeAction = () => {
    mutate({ id: comment._id })
  }

  return (
      <div className="flex gap-2 p-2 mb-2 sm:mb-4 items-start">
          <Avatar isBordered src={comment.userId.avatar} alt="avatar" />
          <div className="bg-white p-2 flex flex-col rounded-xl rounded-tl-none text-black w-full border-orange-500">
              <p className="text-sm mb-3 font-semibold">{comment.userId.username}</p>
              <p className="text-sm mb-3 font-light">{comment.content}</p>
              <div className="flex justify-start items-center">
                <p className="mr-1 text-xs">{comment.likes.length > 0 ? comment.likes.length : null}</p>
                <LikeButton liked={liked} action={likeAction} isPending={isPending} />
              </div>
          </div>
    </div>
  )
}

export default Comment