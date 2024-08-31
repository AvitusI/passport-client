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
    useDisclosure
} from "@nextui-org/react"
import { Bookmark, Ellipsis, Heart, MessageSquareMore, Send, Smile } from "lucide-react"

import { getFollowersSummary } from "../utils/followerSummary"

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

export default function Test() {

    const [isFollowed, setIsFollowed] = useState(false)

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
                            A moment ago
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
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
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

            </section>
        </div>
    )
}