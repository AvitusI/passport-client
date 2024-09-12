/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import axios from "axios" 
import { useInView } from "react-intersection-observer"
import { Avatar } from "@nextui-org/react"
import { PuffLoader, ClipLoader } from "react-spinners"

const fetchProfilePosts = async ({ queryKey, pageParam }) => {
  const [, userId] = queryKey
  const response = await axios.get(`https://shownext1-7sh63dv9.b4a.run/api/posts/user/${userId}?page=${pageParam}`, { withCredentials: true })
  return response.data
}

const ProfilePosts = ({ userId }) => {

  const { ref, inView } = useInView()
  
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['profilePosts', userId],
        queryFn: fetchProfilePosts,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.page + 1 : undefined
  })

  useEffect(() => { 
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])
  
  return status === "pending" ? (
    <div className="h-full w-full flex justify-center items-center">
          <div className="flex flex-col gap-2 items-center">
                <PuffLoader color="orange" />
                <span className="text-sm">Fetching posts...</span>
            </div>
    </div>
  ) : status === "error" ? (
      <div className="h-full w-full flex justify-center items-center">
        <h1 className="text-2xl text-white text-center">
          Network error occured. Try refreshing the page.
        </h1>
      </div>
    ) : (
        <div className="h-full w-full p-4">
          {data.pages.map((page) => {
            return (
              <div key={page.currentPage} className="flex flex-col gap-2">
                {page.items.length > 0 ? page.items.map((post) => {
                  return (
                    <Link key={post._id} to={`/post/${post._id}`}>
                      <div className="grid grid-cols-custom items-center rounded-lg  bg-gray-900 hover:bg-gray-800 text-gray-200 mb-3 p-4 cursor-pointer">
                        <Avatar src={post.author.avatar} size="sm" alt="avatar" />
                        <p className="font-light text-sm truncate">{post.content}</p>
                      </div>
                    </Link>
                  )
                }) : <div>
                    <p className="text-lg text-center text-white pt-6">
                       No posts yet.
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
  )
}

export default ProfilePosts