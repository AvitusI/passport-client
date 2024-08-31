/* eslint-disable react/prop-types */
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import { MessageSquareMore, Ellipsis, Bookmark } from "lucide-react"
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
    useDisclosure,
    Image
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
      <div className="bg-white max-w-96 rounded-md pb-2 text-black mb-8 sm:mb-12">
                    <header className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center font-bold">
                            <span className="mr-2">
                                <Avatar src={post.author.avatar} alt="logo" />
                            </span>
                            <span>{post.author.username}</span>
                          </div>
                          <div className="float-right">
                          <Popover showArrow placement="bottom" backdrop="blur">
                            <PopoverTrigger>
                              <Button
                                isIconOnly
                                className="text-red-500 data-[hover]:bg-slate-200"
                                radius="full"
                                variant="light"
                              >
                                <span><Ellipsis /></span>
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
                    </header>

                    <div className="px-4">
                        <p className="italic text-gray-600 text-sm">
                            A moment ago
                        </p>
                    </div>

                    <div className="px-4 py-3">
                        <p>{post.content}</p>
                    </div>
        
                    {post.pic && (
                      <div className="max-w-96">
                        <Image src={post.pic} alt="pic" className="w-auto rounded-none object-cover" />
                      </div>
                      )}

                    <div className="px-2 pt-2">
                        <div className="grid grid-cols-3 items-center p-4 border-b-2 border-t-2 border-b-gray-300 border-t-gray-300">
                            <div className="border-r-2 border-r-gray-300 flex justify-center items-center">
                                <div className="flex justify-center items-center gap-2">
                                    <p className="text-sm font-bold">{post.likes.length > 0 ? post.likes.length : null}</p>
                                    <LikeButton liked={liked} action={likeAction} isPending={isPending} />
                                </div>
                            </div>
                            <div className="border-r-2 border-r-gray-300 flex justify-center">
                                <Link to={`/post/${post._id}`}>
                                  <div className="flex justify-center items-center gap-2">
                                      <p className="text-xs font-bold">
                                        {post.comments.length > 0 ? post.comments.length : null}
                                      </p>
                                    <MessageSquareMore size={16} />
                                  </div>
                                </Link>
                            </div>
                            <div className="flex justify-center items-center">
                                <div>
                                    <Bookmark size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
  )
}

export default Post