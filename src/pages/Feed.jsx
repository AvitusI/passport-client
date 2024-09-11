import { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"
import { RingLoader, ClipLoader } from "react-spinners"

import Sidebar from "../components/Sidebar"
import PostCard from "../components/PostCard"
import Post from "../components/Post"
import Navbar from "../components/Navbar"

const fetchUserFeed = async ({ pageParam }) => {
    const response = await axios.get(`http://localhost:5000/api/feed?page=${pageParam}`, { withCredentials: true })

    return response.data
}

const Feed = () => {

    const { ref, inView } = useInView()

    const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['items'],
        queryFn: fetchUserFeed,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.page + 1 : undefined
    })

    useEffect(() => { 
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    return status === 'pending' ? (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col gap-2 items-center">
                <RingLoader color="orange" />
                <span className="text-xl">Just a moment...</span>
            </div>
        </div>
    ) : status === 'error' ? (
            <div className="h-screen w-screen flex justify-center items-center">
                <h1 className="text-3xl text-white text-center">Network error occured. Try refreshing the page.</h1>
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
                    <div className="mt-4 sm:mt-10">
                        <PostCard />
                    </div>
                    {/* This is the main feed */}
                    <div className="mt-10 sm:mt-16 p-4">
                            {data.pages.map((page) => {
                                return (
                                    <div key={page.currentPage} className="flex flex-col gap-2">
                                        {page.items.length > 0 ? page.items.map((post) => {
                                            return (
                                                <Post key={post._id} post={post} />
                                            )
                                        }) : <div>
                                                <p className="text-lg text-center text-white mt-6">
                                                    To help us populate your feed, follow some users or post some content.
                                                </p>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                                
                                <div ref={ref} className="flex justify-center items-center">
                                    {isFetchingNextPage &&
                                        <ClipLoader color="orange" />
                                    }
                            </div>
                            </div>
                            {/*}
                            {!isFetchingNextPage &&
                                <div className="container flex p-4 overflow-x-scroll bg-black gap-10">
                                    {profiles.map((profile) => (
                                        <ProfileCard key={profile.name} profile={profile} />
                                    ))}
                                </div>
                            } */}
                </div>
                {/*  blank column in large devices*/}
                <div className="w-1/3 hidden lg:block">

                </div>
            </div>

        </>
  )
}

export default Feed