import { useState, memo } from 'react'
import { useMutation } from "@tanstack/react-query"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { X, Menu, Bell, MessageCircleMore, Sparkles } from 'lucide-react'
import { Avatar, Badge, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'

import { useUser } from "../context/UserContext"
import Sidebar from './Sidebar'
import { toast } from 'react-toastify'

const markAllRead = async (sentData) => {
  const { data } = await axios.put(`https://shownext-tav7bg80.b4a.run/api/notifications/readAll`, sentData, { withCredentials: true })
  return data
}

const markAsRead = async (sentData) => { 
    const { data } = await axios.put(`https://shownext-tav7bg80.b4a.run/api/notifications/`, sentData,{ withCredentials: true })
    return data
}

const markAllReadMessages = async (sentData) => { 
  const { data } = await axios.put(`https://shownext-tav7bg80.b4a.run/api/messagenotify/readAll`, sentData, { withCredentials: true })
  return data
}

const Navbar = memo(() => {

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const { user, notifications, messageNotification, refetchNotifications } = useUser()
  const navigate = useNavigate()

  const toggleMobileDrawer = () => { 
    setMobileDrawerOpen(!mobileDrawerOpen)
  }
  

  const { mutate } = useMutation({
    mutationFn: markAllRead,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(`Error: ${error}`)
  })

  const { mutate: mutateMessages } = useMutation({
    mutationFn: markAllReadMessages,
    onSuccess: () => refetchNotifications(),
    onError: () => toast.error("Operation failed")
  }) 

  const { mutate: mutateRead } = useMutation({
        mutationFn: markAsRead,
    })

  const handleClick = () => {
    refetchNotifications()
    navigate('/chat')
  }

  const handleRedirect = (notification) => {
    refetchNotifications()
    mutateRead({ id: notification._id })
    switch (notification.type) {
      case "FollowNotification":
        navigate(`/profile/${notification.followerId._id}`)
        break;
      case "LikePostNotification":
        navigate(`/post/${notification.postId}`)
        break;
      case "LikeCommentNotification":
        navigate(`/post/${notification.commentId.postId}`)
        break;
      case "LikeReplyNotification":
        navigate(`/post/${notification.replyId.commentId.postId}`)
        break;
      case "CommentNotification":
        navigate(`/post/${notification.postId}`)
        break;
      case "ReplyNotification":
        navigate(`/post/${notification.commentId.postId}`)
        break;
    }
  }

  const handleMarkAllRead = () => { 
    refetchNotifications()
    mutate({ userId: user._id })
  }

  const handeMarkAllReadMessages = () => {
    mutateMessages({ userId: user._id })
  }

  return (
    <div className='container relative sm:px-4 px-2 mx-auto lg:text-sm'>
      <div className='flex justify-between items-center'>
        <div className="flex gap-2 items-center text-orange-300">
              <Sparkles size={24} />
              <span className="font-custom">ShowNext</span>
        </div>

        <div className='flex justify-end'>
          <div className="flex justify-center items-center sm:mr-4 mr-2">
                <Badge
                                content={notifications?.length ? notifications.length : null}
                                color="danger"
                                shape="circle"
                                showOutline={false}
                                placement="top-left"
                >
                  <Popover placement='bottom' color='white' showArrow={true}>
                    <PopoverTrigger>
                      <Bell size={24} className="mr-4 sm:mr-6" />
                    </PopoverTrigger>
                    <PopoverContent>
                      {notifications?.length ? (
                          notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification._id}
                              onClick={() => handleRedirect(notification)}
                              className="w-[300px] grid grid-cols-custom items-center p-2 border-b border-gray-200 gap-2 cursor-pointer hover:bg-slate-300 rounded-md"
                            >
                              <Avatar
                                src={notification?.followerId?.avatar || notification?.likerId?.avatar || notification?.commenterId?.avatar || notification?.replierId?.avatar}
                                alt='avatar'
                                className='w-6 h-6 mr-2'
                              />
                              <p className="text-sm">{notification.message}</p>
                            </div>
                          ))
                        ) : (
                            <div className="p-2">
                                <p className="text-sm">No new notifications</p>
                            </div>
                      )}
                      <div className='grid grid-cols-customization items-center p-2 w-full'>
                        <div className='flex justify-start'>
                          <Link to='/notifications' className='text-sm text-blue-500 float-start'>See all</Link>
                        </div>
                        <div className={`flex justify-end ${notifications.length > 0 ? "" : "hidden"}`}>
                          <span className='text-xs text-blue-500 float-end cursor-pointer' onClick={handleMarkAllRead}>Mark all as read</span>
                        </div>                        
                      </div>
                    </PopoverContent>
                  </Popover>
                </Badge>
                <Badge
                                content={messageNotification?.length ? messageNotification?.length : null}
                                color="danger"
                                shape="circle"
                                showOutline={false}
                                placement="top-left"
                >
                  <Popover placement='bottom' color='white' showArrow={true}>
                    <PopoverTrigger>
                      <MessageCircleMore size={24} className="mr-4 sm:mr-6" />
                    </PopoverTrigger>
                    <PopoverContent>
                      {messageNotification?.length ? (
                          messageNotification.map((notification) => (
                            <div
                              key={notification._id}
                              onClick={handleClick}
                              className="w-[300px] grid grid-cols-custom items-center p-2 border-b border-gray-200 gap-2 cursor-pointer hover:bg-slate-300 rounded-md"
                            >
                              <Avatar src={notification.avatar} alt='avatar' className='w-6 h-6' />
                              <p className="text-sm">{notification?.message}</p>
                            </div>
                          ))
                        ) : (
                            <div className="p-2">
                                <p className="text-sm">No new messages</p>
                            </div>
                        )}
                        <div className='grid grid-cols-customization items-center p-2 w-full'>
                          <div className='flex justify-start'>
                            <Link to='/messageNotifications' className='text-sm text-blue-500 float-start'>See all</Link>
                          </div>
                          <div className={`flex justify-end ${notifications.length > 0 ? "" : "hidden"}`}>
                            <span className='text-xs text-blue-500 float-end cursor-pointer' onClick={handeMarkAllReadMessages}>Mark all as read</span>
                          </div>                        
                        </div>
                    </PopoverContent>
                  </Popover>
                </Badge>
                <Avatar isBordered src={user.avatar} radius="full" className="size-10" />
          </div>
          <button className="lg:hidden md:flex ml-2" onClick={toggleMobileDrawer}>
            {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} /> }
          </button>
        </div>
      </div>
      {mobileDrawerOpen && (
        <div className='fixed left-0 z-20 w-3/4 bg-black bg-opacity-90 lg:hidden h-[calc(100%-60px)]'>
          <Sidebar />
        </div>
      )}
    </div>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar