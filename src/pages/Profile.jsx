import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import { RingLoader } from "react-spinners"
import {
    Button,
    Tabs,
    Tab,
    Avatar,
    useDisclosure,
    AvatarGroup,
    Modal,
    ModalContent,
    ModalBody
} from "@nextui-org/react"
import { NotebookPen, MessageSquareMore, Clapperboard} from "lucide-react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useUser } from "../context/UserContext"
import ProfilePosts from "../components/ProfilePosts"
import ProfileComments from "../components/ProfileComments"
import ProfileMedia from "../components/ProfileMedia"
import CustomButton from "../components/CustomButton"
import { getCommonFollowers, getFollowersByProfileSummary } from "../utils/followerSummary"

const fetchUser = async ({ queryKey }) => {
    const [, userId] = queryKey
    const response = await axios.get(`http://localhost:5000/api/users/${userId}`, { withCredentials: true })
    return response.data
}

const messageUser = async (sentData) => {
        const { data } = await axios.post(`http://localhost:5000/api/chat`, sentData, { withCredentials: true });
        return data
}


const Profile = () => {

    const { isOpen, onOpen, onOpenChange} = useDisclosure()

    const { userId } = useParams();
    const navigate  = useNavigate();
    const { user, setSelectedChat } = useUser();

    const { data , status } = useQuery({
        queryKey: ["user", userId],
        queryFn: fetchUser
    })

    const commonFollowers = getCommonFollowers(user?.followers, data?.followers)

    const isSameUser = user?._id === data?._id
    
    console.log(isSameUser)

    console.log(`data: ${getFollowersByProfileSummary(user, data)}`);

    const { mutate } = useMutation({
        mutationFn: messageUser,
        onSuccess: (data) => {
            setSelectedChat(data[0])
            navigate('/chat')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return status === 'pending' ? (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col gap-2 items-center">
                <RingLoader color="orange" />
                <span className="text-xl">Just a moment...</span>
            </div>
        </div>
    ) : status === 'error' ? (
            <div className="h-screen w-screen flex justify-center items-center">
                <h1 className="text-3xl text-white text-center">
                    Network error occured. Try refreshing the page.
                </h1>
            </div>
    ) : (
      <>
          <div className="sticky top-0 z-50 flex justify-between p-6 border-b border-orange-500 h-20 bg-black">
                <Navbar />
            </div>
            <div className="min-h-screen flex p-3">
                {/* Sidebar */}
                <div className="sticky top-24 z-30 w-1/4 hidden lg:block h-[calc(100%-50px)]">
                    <Sidebar />
                </div>
                {/* Profile column */}
                <div className="w-full lg:w-1/3 p-6 flex flex-col">
                     {/* Profile section */}

                    <section
                        className="max-w-[400px] p-2 flex flex-col gap-3 sm:gap-6 rounded-md mb-4 sm:pr-10"
                     >
                        <div className="flex justify-between">
                            <div className="flex gap-5">
                                <Avatar size="lg" src={data.avatar} />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-lg font-semibold leading-none text-default-600">{data.username}</h4>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className={`text-sm text-default-400 ${data.bio ? "block" : "hidden"}`}>
                                {data.bio} <span className="italic underline text-default-500">more</span>
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex gap-1 items-center">
                                <p className="font-semibold text-white text-xl sm:text-2xl">4</p>
                                <p className="text-default-500 text-xs">Following</p>
                            </div>
                            <div className="flex gap-1 items-center">
                                <p className="font-semibold text-white text-xl sm:text-2xl">{data.followers.length}</p>
                                <p className="text-default-500 text-xs">{`${data.followers.length === 1 ? "Follower" : "Followers"}`}</p>
                            </div>
                        </div>

                        <div className={`p-0 ${isSameUser ? "hidden" : ""}`}>
                            <div
                                className="text-default-500 flex gap-2 flex-1 items-center cursor-pointer"
                                onClick={onOpen}
                            >
                                <span className={`mr-2 ${commonFollowers.length > 0 ? "block" : "hidden"}`}>
                                    <AvatarGroup>
                                        {commonFollowers.slice(0, 3).map((user) => (
                                            <Avatar size="sm" key={user.id} src={user.avatar} alt={user.username} />
                                        ))}
                                    </AvatarGroup>
                                </span>
                                <span className="text-xs">{getFollowersByProfileSummary(user, data)}</span>
                            </div>
                            <Modal
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                placement="center"
                            >
                                <ModalContent>
                                    <ModalBody>
                                        <div className="flex flex-col h-auto max-h-[400px] overflow-scroll container">
                                            <div className="p-4">
                                                {commonFollowers.map((user) => (
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
                        {!(userId === user._id) ? (
                            <div
                                className="flex justify-between items-center"
                            >
                                        <CustomButton data={data} />
                                        <Button
                                            size="sm"
                                            radius="full"
                                            onClick={() => mutate({ userId })}
                                            className="text-white bg-orange-500"
                                        >
                                            Message
                                        </Button>
                                </div>
                                
                            ) : (<Link to={`/edit/user/${user._id}`}><Button radius="full" size="sm" className="text-white bg-orange-500 mt-3 w-[100px]">Edit Profile</Button></Link>)}

                    </section>


                    <Tabs radius="full" color="warning">
                                    <Tab
                                        key="posts"
                                        title={
                                            <div className="flex items-center space-x-2 text-white font-bold">
                                                <NotebookPen />
                                                <span>Posts</span>
                                            </div>
                                        }
                                    >
                                        <ProfilePosts userId={userId} />
                                    </Tab>
                                    <Tab
                                        key="comments"
                                        title={
                                            <div className="flex items-center space-x-2 text-white font-bold">
                                                <MessageSquareMore />
                                                <span>Comments</span>
                                            </div>
                                        }
                                    >
                                        <ProfileComments userId={userId} />
                                    </Tab>
                                    <Tab
                                        key="media"
                                        title={
                                            <div className="flex items-center space-x-2 text-white font-bold">
                                                <Clapperboard />
                                                <span>Media</span>
                                            </div>
                                        }
                                    >
                                        <ProfileMedia userId={userId} />
                                    </Tab>
                    </Tabs>
                            
                </div>
                {/*  blank column in large devices*/}
                <div className="w-1/3 hidden lg:block">            

            </div>
            </div>
      </>
  )
}

export default Profile