/* eslint-disable react/prop-types */
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@nextui-org/react"
import { Ellipsis } from "lucide-react"

import { useUser } from "../context/UserContext"
import LikeButton from "./LikeButton"
import { socket } from "../utils"
import { queryClient } from "../main"
import ListDetailsComment from "./ListDetailsComment"
import { CommentReplyComp } from "./CommentReplyComp"
import { formatTimeDifference } from "../utils/formatTime"

const Comment = ({ comment }) => {

  const { isOpen, onOpen, onOpenChange} = useDisclosure()

  const { user, refetchNotifications } = useUser();

  const likeStatus = comment.likes.some((like) => like._id === user._id)
  const isAuthor = comment.userId._id === user._id

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

  const deleteComment = async () => {
    const { data } = await axios.delete(`http://localhost:5000/api/comments/${comment._id}`, { withCredentials: true })
    return data
  }

  const awaitNotification = () => {
    setTimeout(() => { socket.emit("new_notification") }, 1000)
  }

  const { mutate: mutateLike } = useMutation({
    mutationFn: sendLike,
    onSuccess: () => {
      refetchNotifications()
      awaitNotification()
      queryClient.invalidateQueries(['post', comment.postId], { refetchActive: true })
    },
    onError: (error) => { 
      console.log(error)
    }
  })

  const { mutate: removeComment, isPending: pendingDeletion } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['post', comment.postId], { refetchActive: true })
    },
    onError: () => {
      toast.error("Failed to delete comment")
    }
  }) 

  const likeAction = () => {
    setLiked(!liked)
    mutateLike({ id: comment._id })
  }

  const deleteAction = () => {
    removeComment()
  }

  return (
    <div className="flex gap-2 p-2 mb-2 sm:mb-4 items-start max-w-[400px]">
          <div className="flex-1">
            <Avatar src={comment.userId.avatar} alt="avatar" size="sm" />
          </div>
          <div className="bg-white p-2 flex flex-col gap-2 rounded-xl rounded-tl-none text-black w-full">
              <div className="flex justify-between items-center">
              <p className="text-sm mb-3 font-semibold">{comment.userId.username}</p>
              <Popover showArrow placement="bottom" backdrop="blur">
                <PopoverTrigger>
                    <Button
                        isIconOnly
                        className={`text-black data-[hover]:bg-slate-200 ${isAuthor ? "" : "hidden"}`}
                        radius="full"
                        variant="light"
                      >
                        <span><Ellipsis size={16} /></span>
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <ListDetailsComment type={"edit"} commentId={comment._id}>Edit Comment</ListDetailsComment>
                        <ListDetailsComment type={"delete"} onOpen={onOpen}>Delete Comment</ListDetailsComment>
                      </div>
                    </PopoverContent>
                </Popover>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="xs">
                            <ModalContent>
                              {(onClose) => (
                                <>
                                  <ModalHeader>Are you sure?</ModalHeader>
                                  <ModalBody>
                                    <p>This action is irreversible</p>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button onClick={onClose}>Cancel</Button>
                                    <Button color="danger" onClick={deleteAction} isDisabled={pendingDeletion}>Proceed</Button>
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                  </Modal>
              </div>
              <span className="text-xs text-default-300 italic mb-1">{formatTimeDifference(new Date(comment.createdAt))}</span>
              <p className="text-sm mb-3">{comment.content}</p>
              <div className="grid grid-cols-2 border-t-2 border-t-gray-300">
                <div className="flex justify-center items-center gap-2 border-r-2 border-r-gray-300">
                  <p className={`text-xs ${comment?.likes.length > 0 ? "block" : "hidden"}`}>
                    {comment?.likes.length > 0 ? comment?.likes.length : null}
                  </p>
                  <LikeButton liked={liked} action={likeAction} />
                </div>
                <CommentReplyComp comment={comment} />
              </div>
          </div>
    </div>
  )
}

export default Comment