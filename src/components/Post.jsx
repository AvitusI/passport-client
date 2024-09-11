/* eslint-disable react/prop-types */
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { MessageSquareMore, Ellipsis } from "lucide-react"
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
import BookmarkButton from "./BookmarkButton"
import ListDetails from "./ListDetails"
import { queryClient } from "../main"
import { formatTimeDifference } from "../utils/formatTime"
import { socket } from "../utils"

const Post = ({ post }) => {

  const { user, refetchNotifications } = useUser()

  const likeStatus = post.likes.some((like) => like._id === user._id)
  const isAuthor = post.author._id === user._id
  const bookmarkedStatus = user.bookmarks.some((bookmark) => bookmark._id === post._id)

  const [liked, setLiked] = useState(likeStatus)
  const [bookmarked, setBookmarked] = useState(bookmarkedStatus)

  const { isOpen, onOpen, onOpenChange} = useDisclosure()

  const sendLike = async (sentData) => {
    if (likeStatus) {
      const { data } = await axios.post("https://shownext-tav7bg80.b4a.run/api/posts/unlike", sentData, { withCredentials: true })
      return data
    }
    else {
      const { data } = await axios.post("https://shownext-tav7bg80.b4a.run/api/posts/like", sentData, { withCredentials: true })
      return data
    }
  }

  const deletePost = async () => {
    const { data } = await axios.delete(`https://shownext-tav7bg80.b4a.run/api/posts/${post._id}`, { withCredentials: true })
    return data
  }

  const sendBookmark = async () => {
    if (bookmarkedStatus) {
      const { data } = await axios.post(`https://shownext-tav7bg80.b4a.run/api/posts/unbookmark/${post._id}`, {}, { withCredentials: true })
      return data
    }
    else {
      const { data } = await axios.post(`https://shownext-tav7bg80.b4a.run/api/posts/bookmark/${post._id}`, {}, { withCredentials: true })
      return data
    }
  }

  const awaitNotification = () => {
    setTimeout(() => { socket.emit("new_notification") }, 1000)
  }

  const { mutate: mutateLike } = useMutation({
    mutationFn: sendLike,
    onSuccess: () => {
      if (liked) {
        awaitNotification()
      }
      queryClient.invalidateQueries(['items'], { refetchActive: true })
    },
    onError: () => { 
      toast.error("Failed to like post")
    }
  })

  const { mutate: mutateDelete, isPending: pendingDeletion } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['items'], { refetchActive: true })
    },
    onError: () => {
      toast.error("Failed to delete post")
    }
  })

  const { mutate: mutateBookmark, isPending: pendingBookmarked } = useMutation({
    mutationFn: sendBookmark,
    onSuccess: () => {
      refetchNotifications()
      queryClient.invalidateQueries(['items'], { refetchActive: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })

  const likeAction = () => {
    setLiked(!liked)
    mutateLike({ id: post._id })
  }

  const deleteAction = () => { 
    mutateDelete()
  }

  const bookmarkAction = () => { 
    setBookmarked(!bookmarked)
    mutateBookmark()
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
                                className={`text-black data-[hover]:bg-slate-200 ${isAuthor ? "" : "hidden"}`}
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
                                    <Button color="danger" onClick={deleteAction} isDisabled={pendingDeletion}>Proceed</Button>
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                        </div>
                    </header>

                    <div className="px-4">
                        <p className="italic text-gray-600 text-sm">
                            {formatTimeDifference(new Date(post.createdAt))}
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
                          <div className={`grid grid-cols-3 items-center p-4 ${post.pic ? "" : "border-t-2 border-t-gray-300"}`}>
                            <div className="flex justify-center items-center">
                                <div className="flex justify-center items-center gap-2">
                                    <p className="text-sm font-bold">{post.likes.length > 0 ? post.likes.length : null}</p>
                                    <LikeButton liked={liked} action={likeAction} />
                                </div>
                            </div>
                            <div className="flex justify-center">
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
                                    <BookmarkButton bookmarked={bookmarked} action={bookmarkAction} isPending={pendingBookmarked} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
  )
}

export default Post