import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Spinner, Image, Button, Tabs, Tab } from "@nextui-org/react"
import { NotebookPen, MessageSquareMore, Clapperboard} from "lucide-react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useUser } from "../context/UserContext"
import ProfilePosts from "../components/ProfilePosts"
import ProfileComments from "../components/ProfileComments"
import ProfileMedia from "../components/ProfileMedia"

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

    const { userId } = useParams();
    const navigate  = useNavigate();
    const { user, setSelectedChat } = useUser();

    const { data , status, error } = useQuery({
        queryKey: ["user", userId],
        queryFn: fetchUser
    })

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
        <div className="h-screen w-screen flex justify-center items-center">
            <Spinner size="lg" />
        </div>
    ) : status === 'error' ? (
            <div className="h-screen w-screen flex justify-center items-center">
                <h1 className="text-3xl text-white text-center">An Error Occured: { error.message}</h1>
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
                    <div className="grid grid-cols-2 gap-2 sm:gap-4 text-white">
                                <div className="flex p-2 sm:p-4 justify-center items-center">
                                    <Image src={data.avatar} alt="avatar" className="rounded-full" />
                                </div>
                                <div className="flex flex-col p-2 sm:p-4 gap-2">
                                    <p className="font-bold text-lg mb-2">{data.username}</p>
                                    <div className="flex flex-col justify-start">
                                        <p className="font-bold text-2xl">{`${data.followers.length}`}</p>
                                        <p className="font-bold text-2xl tracking-wide">{`${data.followers.length === 1 ? "follower" : "followers"}`}</p>
                                    </div>
                                </div>
                    </div>

                            {!(userId === user._id) &&
                                <div className="flex justify-between mt-6 gap-2">
                                    <Button className="text-white bg-orange-500">Follow</Button>
                                    <Button onClick={() => mutate({ userId })} className="text-white bg-orange-500">Message</Button>
                                </div>
                            }
                            <div className="flex w-full flex-col mt-10">
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
                                        <ProfileMedia />
                                    </Tab>
                                </Tabs>
                            </div>
                </div>
                {/*  blank column in large devices*/}
                <div className="w-1/3 hidden lg:block">            

                </div>
            </div>
      </>
  )
}

export default Profile