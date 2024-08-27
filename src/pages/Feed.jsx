import { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"
import { Spinner } from "@nextui-org/react"

import { useUser } from "../context/UserContext"
import Sidebar from "../components/Sidebar"
import FeedBar from "../components/FeedBar"
import PostCard from "../components/PostCard"
import Post from "../components/Post"
import Navbar from "../components/Navbar"
import ProfileCard from "../components/ProfileCard"

const profiles = [
    {
        name: "John Doe",
        avatar: "/images/baloon.jpg",
        posts: 5
    },
    {
        name: "Jane Doe",
        avatar: "/images/honey.jpg",
        posts: 10
    },
    {
        name: "John Smith",
        avatar: "/images/milk.jpg",
        posts: 4
    },
    {
        name: "Jim Felix",
        avatar: "/images/baloon.jpg",
        posts: 12
    },
    {
        name: "James Pete",
        avatar: "/images/honey.jpg",
        posts: 1
    },
    {
        name: "James Felix",
        avatar: "/images/baloon.jpg",
        posts: 0
    }
]

const fetchUserFeed = async ({ pageParam }) => {
    //await new Promise((resolve) => setTimeout(resolve, 3000))
    const response = await axios.get(`http://localhost:5000/api/feed?page=${pageParam}`, { withCredentials: true })

    return response.data
}

const Feed = () => {

    const { user } = useUser()
    const { ref, inView } = useInView()

    const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['items'],
        queryFn: fetchUserFeed,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.page + 1 : undefined
    })

    useEffect(() => { 
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage, user])

    return status === 'pending' ? (
        <div className="h-screen w-screen flex justify-center items-center">
            <Spinner size="lg" />
        </div>
    ) : status === 'error' ? (
            <div className="h-screen w-screen flex justify-center items-center">
                <h1 className="text-3xl text-white text-center">An Error Occured: {error.message}</h1>
            </div>
    ) :  (
      <>
            <div className="sticky top-0 z-50 flex justify-between p-6 border-b border-orange-500 h-20 bg-black">
                <Navbar />
            </div>
            <div className="min-h-screen flex p-3">
                {/* Sidebar */}
                <div className="sticky top-24 z-30 w-1/4 hidden lg:block h-[calc(100%-50px)]">
                    <Sidebar />
                </div>
                {/* Feed column */}
                <div className="w-full lg:w-1/3 p-6">
                    <div className="flex justify-center items-center">
                        <FeedBar />
                    </div>
                    <div className="mt-4 sm:mt-10">
                        <PostCard />
                    </div>
                    {/* This is the main feed */}
                    <div className="mt:10 sm:mt-16">
                            {data.pages.map((page) => {
                                return (
                                    <div key={page.currentPage} className="flex flex-col gap-2">
                                        {page.items.length > 0 ? page.items.map((post) => {
                                            return (
                                                <Post key={post._id} post={post} />
                                            )
                                        }) : <div>
                                                <p className="text-lg text-center text-white mt-6">
                                                    Your feed is empty. Follow some users to populate it.
                                                </p>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                                
                                <div ref={ref} className="flex justify-center items-center">
                                    {isFetchingNextPage &&
                                        <Spinner size="lg" />
                                    }
                            </div>
                            </div>
                            {!isFetchingNextPage &&
                                <div className="container flex p-4 overflow-x-scroll bg-black gap-10">
                                    {profiles.map((profile) => (
                                        <ProfileCard key={profile.name} profile={profile} />
                                    ))}
                                </div>
                            }
                </div>
                {/*  blank column in large devices*/}
                <div className="w-1/3 hidden lg:block">

                </div>
            </div>

        </>
  )
}

export default Feed