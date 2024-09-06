import { useState } from "react"

import {
    Avatar,
    AvatarGroup,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
} from "@nextui-org/react"
import { Bookmark, Ellipsis, Heart, MessageSquareMore, Send, Smile, Reply, SendHorizontal, ImageUp } from "lucide-react"

import { getFollowersSummary } from "../utils/followerSummary"
import { formatTimeDifference } from "../utils/formatTime"

const post = {
    content: "Hi, there. I'm so excited to share with you a couple of things I have got today. But before I take charge, I would love to know more about you, at least an introduction.",
    pic: "/images/milk.jpg",
    time: "2 h",
    likes: 100,
    comments: 20
}

const followedUsers = [
    {
        id: "1",
        username: "John",
        avatar: "/images/founder.jpg",
    },
    {
        id: "2",
        username: "Doe",
        avatar: "/images/milk.jpg",
    },
    {
        id: "3",
        username: "Jane",
        avatar: "/images/baloon.jpg"
    },
    {
        id: "4",
        username: "Alexa",
        avatar: "/images/honey.jpg"
    },
    {
        id: "5",
        username: "Jacob",
        avatar: "/images/founder.jpg"
    },
    {
        id: "6",
        username: "Jacob",
        avatar: "/images/founder.jpg"
    },
    {
        id: "7",
        username: "Jacob",
        avatar: "/images/founder.jpg"
    },
    {
        id: "8",
        username: "Jacob",
        avatar: "/images/founder.jpg"
    }
]

const comment = {
    content: "Mhh I don't think the same way. If God intended us to be the same, He would give us the same size of our legs.",
    avatar: "/images/founder.jpg",
    likes: 4,
    replies: 8,
    username: "John Doe",
    time: "2 hours ago"
}

const replies = [
    {
        id: "1",
        content: "I don't think so, I have a different opinion. It is not about the size of the legs, but the size of the heart.",
        avatar: "/images/milk.jpg",
        likes: 2,
        username: "Jane Doe",
        time: "2 hours ago"
    },
    {
        id: "2",
        content: "Yes, sure!",
        avatar: "/images/baloon.jpg",
        likes: 3,
        username: "Jane Doe",
        time: "2 hours ago"
    },
    {
        id: "3",
        content: "I don't think so, I have a different opinion",
        avatar: "/images/honey.jpg",
        likes: 3,
        username: "Jane Doe",
        time: "2 hours ago"
    },
    {
        id: "4",
        content: "I don't think so, I have a different opinion",
        avatar: "/images/founder.jpg",
        likes: 3,
        username: "Jane Doe",
        time: "2 hours ago"
    },
    {
        id: "5",
        content: "I don't think so, I have a different opinion",
        avatar: "/images/founder.jpg",
        likes: 3,
        username: "Jane Doe",
        time: "2 hours ago"
    },
    {
        id: "6",
        content: "I don't think so, I have a different opinion",
        avatar: "/images/founder.jpg",
        likes: 3,
        username: "Jane Doe",
        time: "2 hours ago"
    },
    {
        id: "7",
        content: "I don't think so, I have a different opinion",
        avatar: "/images/founder.jpg",
        likes: 3,
        username: "Jane Doe",
        time: "2 hours ago"
    },
    {
        id: "8",
        content: "I don't think so, I have a different opinion",
        avatar: "/images/founder.jpg",
        likes: 3,
        username: "Jane Doe",
        time: "2 hours ago"
    }
]

const notifications = [
    {
        id: "1",
        type: "LikeNotification",
        avatar: "/images/founder.jpg",
        message: "John Doe liked your post",
        read: false
    },
    {
        id: "2",
        type: "FollowNotification",
        avatar: "/images/founder.jpg",
        message: "Jane Doe started following you",
        read: false
    },
    {
        id: "3",
        type: "CommentNotification",
        avatar: "/images/founder.jpg",
        message: "Peter Othiong commented on your post",
        read: false
    },
    {
        id: "4",
        type: "LikeNotification",
        avatar: "/images/founder.jpg",
        message: "John Doe liked your post",
        read: true
    },
    {
        id: "5",
        type: "LikeNotification",
        avatar: "/images/founder.jpg",
        message: "John Doe liked your comment",
        read: true
    },
    {
        id: "6",
        type: "LikeNotification",
        avatar: "/images/founder.jpg",
        message: "John Doe liked your reply",
        read: true
    },
    {
        id: "7",
        type: "ReplyNotification",
        avatar: "/images/founder.jpg",
        message: "John Doe replied to your comment",
        read: true
    }
]

const messageNotification = [
    {
        id: "1",
        avatar: "/images/founder.jpg",
        message: "Sam Smith messaged you",
        read: false
    },
    {
        id: "2",
        avatar: "/images/founder.jpg",
        message: "Kelvin Hamza messaged you",
        read: false
    },
    {
        id: "3",
        avatar: "/images/founder.jpg",
        message: "John Doe messaged you",
        read: true
    },
    {
        id: "4",
        avatar: "/images/founder.jpg",
        message: "Jane Doe messaged you",
        read: true
    },
    {
        id: "5",
        avatar: "/images/founder.jpg",
        message: "Abdul Kharim messaged you",
        read: true
    }
]

export default function Test() {

    const [isFollowed, setIsFollowed] = useState(false)
    const [sendMessage, setSendMessage] = useState();

    const [message, setMessage] = useState("");
    const [commentMsg, setCommentMsg] = useState("");

    const { isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className="min-h-screen flex justify-center items-center p-2">
            <section className="flex flex-col justify-center mt-8 text-black gap-12">
                <article className="bg-white w-96 rounded-md">
                    <header className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center font-bold">
                            <span className="mr-2">
                                <Avatar src="/images/founder.jpg" alt="logo" />
                            </span>
                            <span>John Doe</span>
                        </div>
                        <div className="float-right">
                            <span><Ellipsis /></span>
                        </div>
                    </header>
                    <div className="size-96">
                        <Image src="/images/founder.jpg" alt="pic" className="h-[384px] w-[384px] rounded-none object-cover" />
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <span className="mr-4"><Heart /></span>
                                <span className="mr-4"><MessageSquareMore /></span>
                                <span className="mr-4"><Send /></span>
                            </div>
                            <div>
                                <span><Bookmark /></span>
                            </div>
                        </div>
                        <div className="font-bold">
                            35, 232 likes
                        </div>
                        <div>
                            <a href="#" className="text-gray-400">View all 100 comments</a>
                        </div>
                        <div>
                            <div>
                                <span className="font-bold">Alexa Scott </span>
                                <span>Mmh looks awesome. Where did you generate it, lol! Is it your product?</span>
                            </div>
                            <div>
                                <span className="font-bold">Jacob Hamza </span>
                                <span>Great effort, founder</span>
                            </div>
                        </div>
                        <small className="text-gray-400">2 HOURS</small>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-2">
                                <Smile />                               
                                <input
                                    type="text"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight
                                                        focus:outline-none focus:bg-white focus:border-purple-500"
                                />
                            </div>
                            <button className="px-3 py-2 text-purple-900 bg-gray-200 focus:bg-gray-300">Post</button>
                        </div>
                    </div>
                </article>

                <article className="bg-white w-96 rounded-md pb-2">
                    <header className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center font-bold">
                            <span className="mr-2">
                                <Avatar src="/images/founder.jpg" alt="logo" />
                            </span>
                            <span>John Doe</span>
                        </div>
                        <div className="float-right">
                            <span><Ellipsis /></span>
                        </div>
                    </header>

                    <div className="px-4">
                        <p className="italic text-gray-600 text-sm">
                            {formatTimeDifference(new Date("2023-09-01T13:00:00Z"))}
                        </p>
                    </div>

                    <div className="px-4 py-3">
                        <p>{post.content}</p>
                    </div>

                    <div className="size-96">
                        <Image src={post.pic} alt="pic" className="h-[384px] w-[384px] rounded-none object-cover" />
                    </div>

                    <div className="px-2 pt-2">
                        <div className="grid grid-cols-3 items-center p-4 border-b-2 border-t-2 border-b-gray-300 border-t-gray-300">
                            <div className="border-r-2 border-r-gray-300 flex justify-center items-center">
                                <div className="flex justify-center items-center gap-2">
                                    <p className="text-xs font-bold">
                                        {post.likes}
                                    </p>
                                    <Heart size={16} />
                                </div>
                            </div>
                            <div className="border-r-2 border-r-gray-300 flex justify-center">
                                <div className="flex justify-center items-center gap-2">
                                    <p className="text-xs font-bold">
                                        {post.comments}
                                    </p>
                                    <MessageSquareMore size={16} />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div>
                                    <Bookmark size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                </article>

                <article className="bg-white w-96 rounded-md pb-2">
                    <header className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center font-bold">
                            <span className="mr-2">
                                <Avatar src="/images/founder.jpg" alt="logo" />
                            </span>
                            <h4 className="text-small font-semibold leading-none">John Doe</h4>
                        </div>
                        <div className="float-right">
                            <span><Ellipsis /></span>
                        </div>
                    </header>

                    <div className="px-4">
                        <p className="italic text-gray-600">
                            {post.time}
                        </p>
                    </div>

                    <div className="px-4 py-3">
                        <p>{post.content}</p>
                    </div>

                    <div className="px-2 pt-2">
                        <div className="grid grid-cols-3 items-center p-4 border-b-2 border-t-2 border-b-gray-300 border-t-gray-300">
                            <div className="border-r-2 border-r-gray-300 flex justify-center items-center">
                                <div className="flex justify-center items-center gap-2">
                                    <p className="text-xs font-bold">
                                        {post.likes}
                                    </p>
                                    <Heart size={16} />
                                </div>
                            </div>
                            <div className="border-r-2 border-r-gray-300 flex justify-center">
                                <div className="flex justify-center items-center gap-2">
                                    <p className="text-xs font-bold">
                                        {post.comments}
                                    </p>
                                    <MessageSquareMore size={16} />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div>
                                    <Bookmark size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                </article>

                <div className="flex flex-col gap-2">

                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 border border-orange-500">
                    <div className="flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="/images/founder.jpg"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-shrink-0">
                          <p className="text-white">Founder UDO Tech</p>
                        </div>
                    </div>
                        <div className="flex items-center justify-between">
                            <Button size="sm" className="bg-orange-500 text-white uppercase">Profile</Button>
                        </div>
                    </div>

                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 border border-orange-500">
                    <div className="flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="/images/founder.jpg"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-shrink-0">
                          <p className="text-white">Founder UDO Tech</p>
                        </div>
                    </div>
                        <div className="flex items-center justify-between">
                            <Button size="sm" className="bg-orange-500 text-white uppercase">Profile</Button>
                        </div>
                    </div>

                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 border border-orange-500">
                    <div className="flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="/images/founder.jpg"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-shrink-0">
                          <p className="text-white">Founder UDO Tech</p>
                        </div>
                    </div>
                        <div className="flex items-center justify-between">
                            <Button size="sm" className="bg-orange-500 text-white uppercase">Profile</Button>
                        </div>
                    </div>

                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 border border-orange-500">
                    <div className="flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="/images/founder.jpg"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-shrink-0">
                          <p className="text-white">Founder UDO Tech</p>
                        </div>
                    </div>
                        <div className="flex items-center justify-between">
                            <Button size="sm" className="bg-orange-500 text-white uppercase">Profile</Button>
                        </div>
                    </div>

                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 border border-orange-500">
                    <div className="flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="/images/founder.jpg"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-shrink-0">
                          <p className="text-white">Founder UDO Tech</p>
                        </div>
                    </div>
                        <div className="flex items-center justify-between">
                            <Button size="sm" className="bg-orange-500 text-white uppercase">Profile</Button>
                        </div>
                    </div>

                </div>

                <Card className="max-w-[400px] bg-black">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src="/images/founder.jpg"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                        </div>
                    </div>
                    <Button
                        className={isFollowed ? "bg-blue text-white border-default-200" : ""}
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={isFollowed ? "bordered" : "solid"}
                        onPress={() => setIsFollowed(!isFollowed)}
                    >
                        {isFollowed ? "Unfollow" : " Follow"}
                    </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                    </p>
                    <span className="pt-2">
                        #FrontendWithZoey
                        <span className="py-2" aria-label="computer" role="img">
                            💻
                        </span>
                    </span>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1 items-center">
                        <p className="font-semibold text-white text-lg">4</p>
                        <p className="text-default-400 text-xs">Following</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="font-semibold text-white text-lg">97.1K</p>
                        <p className="text-default-400 text-xs">Followers</p>
                    </div>
                </CardFooter>
                </Card>
                
                <section
                    className="max-w-[400px] p-2 flex flex-col gap-6 rounded-md"
                >
                    <div className="flex justify-between">
                        <div className="flex gap-5">
                            <Avatar size="lg" src="/images/founder.jpg" />
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-lg font-semibold leading-none text-default-600">Zoey Lang</h4>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-default-400">
                             Frontend developer and UI/UX enthusiast. Join me on this coding adventure!.. <span className="italic underline text-default-500">more</span>
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex gap-1 items-center">
                            <p className="font-semibold text-white text-2xl">4</p>
                            <p className="text-default-500 text-xs">Following</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <p className="font-semibold text-white text-2xl">97.1K</p>
                            <p className="text-default-500 text-xs">Followers</p>
                        </div>
                    </div>

                    <div className="p-0">
                        <div
                            className="text-default-500 flex gap-2 flex-1 items-center cursor-pointer"
                            onClick={onOpen}
                        >
                            <span className="mr-2">
                                <AvatarGroup>
                                    {followedUsers.slice(0, 3).map((user) => (
                                        <Avatar size="sm" key={user.id} src={user.avatar} alt={user.username} />
                                    ))}
                                </AvatarGroup>
                            </span>
                            <span>{getFollowersSummary(followedUsers)}</span>
                        </div>
                        <Modal
                           // isOpen={isOpen}
                         //   onOpenChange={onOpenChange}
                            placement="center"
                        >
                            <ModalContent>
                                <ModalBody>
                                    <div className="flex flex-col h-[400px] overflow-scroll container">
                                        <div className="p-4">
                                            {followedUsers.map((user) => (
                                                <div key={user.id}>
                                                <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3">
                                                    <div className="flex-shrink-0">
                                                        <Avatar src={user.avatar} alt="avatar" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between flex-shrink-0">
                                                                <p className="text-black">{user.username}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Button size="sm" radius="full" className="bg-black text-white uppercase">Profile</Button>
                                                    </div>
                                                </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </div>

                    <div
                        className="flex justify-between items-center"
                    >
                        <Button size="sm" radius="full" className="text-white bg-orange-500">Follow</Button>
                        <Button size="sm" radius="full" className="text-white bg-orange-500">Message</Button>
                    </div>

                </section>

                <div className="m-2 p-2">
                    <Button
                        size="sm"
                        radius="full"
                        className="bg-orange-500 text-white uppercase"
                        onClick={onOpen}
                    >
                        Reply
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="top"
                    >
                        <ModalContent>
                            <ModalBody>
                                <div className="max-h-[700px] h-auto flex flex-col gap-2 sm:gap-4">
                                    {/** Comment */}
                                    <div className="flex-none p-4 ">
                                        <div className="flex justify-start gap-4">
                                            <div className="flex-1">
                                                <Avatar src={comment.avatar} alt="avatar" />
                                            </div>
                                            <div className="flex flex-col gap-4 w-full pt-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-md font-semibold leading-none text-default-800">
                                                        {comment.username}
                                                    </span>
                                                    <span className="text-xs italic text-default-800">{comment.time}</span>
                                                </div>
                                                <p className="text-md">{comment.content}</p>
                                                <div className="flex justify-between border-t-2 border-gray-300 pt-3">
                                                    <div className="flex justify-center items-center gap-2">
                                                        <span>{comment.likes}</span>
                                                        <Heart size={16} fill="red" />
                                                    </div>
                                                    <div className="flex justify-center items-center gap-2">
                                                        <span>{comment.replies}</span>
                                                        <Reply size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/** Replies */}
                                    <div className="flex-1 overflow-y-auto max-h-[300px]">
                                        {replies.map((reply) => (
                                            <div key={reply.id} className="p-4">
                                                <div className="flex justify-start gap-4">
                                                    <div className="flex-1">
                                                        <Avatar src={reply.avatar} alt="avatar" />
                                                    </div>
                                                    <div className="flex flex-col gap-4 w-full pt-2">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-md font-semibold leading-none text-default-800">
                                                                {reply.username}
                                                            </span>
                                                            <span className="text-xs italic text-default-800">{reply.time}</span>
                                                        </div>
                                                        <p className="text-sm">{reply.content}</p>
                                                        <div className="flex justify-between border-t-2 border-gray-300 pt-3">
                                                            <div className="flex justify-center items-center gap-2">
                                                                <span>{reply.likes}</span>
                                                                <Heart size={16} fill="red" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Input */}
                                    <div className="flex-none">
                                        <div className="relative flex">
                                            <textarea
                                                placeholder="Write your reply"
                                                rows="1"
                                                className="focus:outline-none focus:ring-orange-500 focus:ring-2 w-full focus:placeholder-gray-600 text-gray-700 placeholder-gray-500 pl-12 pr-12 bg-gray-100 rounded-full py-3 border-gray-200 resize-none"
                                                value={sendMessage}
                                                onChange={(e) => setSendMessage(e.target.value)}
                                            ></textarea>
                                            <span className={`absolute inset-y-0 items-center right-0 ${sendMessage ? "flex" : "hidden"}`}>
                                                <button
                                                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out bg-orange-500 hover:bg-orange-600 text-white"
                                                >
                                                    <SendHorizontal />
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <div className="m-2 mb-4 text-center">
                        <p className="text-2xl">All Notifications</p>
                    </div>
                    {notifications.map((notification) => (
                            <div key={notification.id} className="max-w-[400px] relative rounded-lg px-2 py-2 grid grid-cols-custom gap-2 items-center mb-3">
                                <div className="flex-shrink-0">
                                    <Avatar src={notification.avatar} alt="avatar" size="sm" />
                                </div>
                                <div className="grid grid-cols-customized items-center">
                                    <span className="text-sm text-default-600">{notification.message}</span>
                                    <span className={`text-red-600 ${notification.read ? "hidden" : ""}`}>
                                        <svg width={10} height={10}>
                                            <circle cx={5} cy={5} r={5} fill="currentColor" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <div className="m-2 mb-4 text-center">
                        <p className="text-2xl">All Message Notifications</p>
                    </div>
                    {messageNotification.map((notification) => (
                            <div key={notification.id} className="max-w-[400px] relative rounded-lg px-2 py-2 grid grid-cols-custom gap-2 items-center mb-3">
                                <div className="flex-shrink-0">
                                    <Avatar src={notification.avatar} alt="avatar" size="sm" />
                                </div>
                                <div className="grid grid-cols-customized items-center">
                                    <span className="text-sm text-default-600">{notification.message}</span>
                                    <span className={`text-red-600 ${notification.read ? "hidden" : ""}`}>
                                        <svg width={10} height={10}>
                                            <circle cx={5} cy={5} r={5} fill="currentColor" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                    ))}
                </div>

                <article className="bg-white w-96 rounded-md pb-2">
                    <header className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center font-bold">
                            <span className="mr-2">
                                <Avatar src="/images/founder.jpg" alt="logo" />
                            </span>
                            <h4 className="text-small font-semibold leading-none">John Doe</h4>
                        </div>
                    </header>

                    <div className="px-4 py-3">
                        <textarea
                            className="w-full p-2 h-16 focus:outline-none bg-white text-black placeholder:text-gray-700"
                            placeholder="Any thoughts today?"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        ></textarea>
                    </div>

                    <div className="px-2 pt-2">
                        <div className="flex items-center justify-between p-4 border-t-2 border-t-gray-300">
                            <Button
                                isIconOnly
                                radius="full"
                                className="bg-white text-black hover:bg-gray-300 cursor-pointer"
                            >
                                <ImageUp size={24} />
                            </Button>
                            <Button
                                isIconOnly
                                radius="full"
                                className="bg-orange-500 text-white hover:bg-orange-700 cursor-pointer"
                                isDisabled={!message}
                            >
                                <SendHorizontal size={24} />
                            </Button>
                        </div>
                    </div>

                </article>

                <article className="bg-white w-96 rounded-md pb-2">
                    <header className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center font-bold">
                            <span className="mr-2">
                                <Avatar src="/images/founder.jpg" alt="logo" />
                            </span>
                            <h4 className="text-small font-semibold leading-none">John Doe</h4>
                        </div>
                    </header>

                    <div className="px-4 py-3">
                        <textarea
                            className="w-full p-2 h-16 focus:outline-none bg-white text-black placeholder:text-gray-700"
                            placeholder="What do you think?"
                            onChange={(e) => setCommentMsg(e.target.value)}
                            value={commentMsg}
                        ></textarea>
                    </div>

                    <div className="px-2 pt-2">
                        <div className="flex justify-end p-4 border-t-2 border-t-gray-300">
                            <Button
                                isIconOnly
                                radius="full"
                                className="bg-orange-500 text-white hover:bg-orange-700 cursor-pointer"
                                isDisabled={!commentMsg}
                            >
                                <SendHorizontal size={24} />
                            </Button>
                        </div>
                    </div>

                </article>

            </section>
        </div>
    )
}