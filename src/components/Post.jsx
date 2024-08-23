/* eslint-disable react/prop-types */
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import { MessageSquareMore, ListCollapse } from "lucide-react"
import {
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Modal,
    ModalHeader,
    ModalContent,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react"

import { useUser } from "../context/UserContext"
import LikeButton from "./LikeButton"
import ListDetails from "./ListDetails"
import { queryClient } from "../main"

const Post = ({ post }) => {

  const { user } = useUser()

  const likeStatus = post.likes.some((like) => like._id === user._id)

  const [liked, setLiked] = useState(likeStatus)

  const { isOpen, onOpen, onOpenChange} = useDisclosure()

  const sendLike = async (sentData) => {
    if (likeStatus) {
      const { data } = await axios.post("http://localhost:5000/api/posts/unlike", sentData, { withCredentials: true })
      return data
    }
    else {
      const { data } = await axios.post("http://localhost:5000/api/posts/like", sentData, { withCredentials: true })
      return data
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: sendLike,
    onSuccess: () => {
      setLiked(!liked)
      queryClient.invalidateQueries(['items'], { refetchActive: true })
    },
    onError: (error) => { 
      console.log(error)
    }
  })

  const likeAction = () => {
    mutate({ id: post._id })
  }

  return (
      <div className="flex flex-col bg-white text-black p-4 rounded-lg mb-6 sm:mb-10 border-2 border-orange-500">
          <div className="flex justify-between items-center">    
            <div className="flex justify-start items-center mb-2">
              <Avatar src={post.author.avatar} alt="avatar" className="size-10 mr-3" />
              <p className="font-semibold text-2xl">{post.author.username }</p>
        </div>
        <Popover showArrow placement="bottom" backdrop="blur">
          <PopoverTrigger>
            <Button
              isIconOnly
              className="text-red-500 data-[hover]:bg-slate-200"
              radius="full"
              variant="light"
            >
              <ListCollapse size={20} color="black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <ListDetails type={"edit"} postId={post._id}>Edit Post</ListDetails>
              <ListDetails type={"delete"} onOpen={onOpen}>Delete Post</ListDetails>
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
                                  <Button color="danger">Proceed</Button>
                              </ModalFooter>
                          </>
                      )}
                  </ModalContent>
              </Modal>
          </div>
          <div className="flex flex-col mb-3 border-b-2 p-4">
            <p className="text-sm mb-1">{post.content}</p>
            {post.pic && (
              < img src={post.pic} alt="post" className="object-cover rounded-md w-full size-40" />
            )}
          </div>
          <div className="flex justify-between p-4">
        <div className="flex justify-start items-center">
            <p className="text-sm">{post.likes.length > 0 ? post.likes.length : null}</p>
                <LikeButton liked={liked} action={likeAction} isPending={isPending} />
              </div>
              <Link to={`/post/${post._id}`}>
                  <MessageSquareMore />
                </Link>
          </div>
    </div>
  )
}

export default Post