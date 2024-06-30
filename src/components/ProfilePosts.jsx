/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios" 
import { useInView } from "react-intersection-observer"
import { Avatar, Spinner } from "@nextui-org/react"

const fetchProfilePosts = async ({ queryKey, pageParam }) => {
  const [, userId] = queryKey
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const response = await axios.get(`http://localhost:5000/api/posts/user/${userId}?page=${pageParam}`, { withCredentials: true })
  return response.data
}

const ProfilePosts = ({ userId }) => {

  const { ref, inView } = useInView()
  
  const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
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
      <Spinner size="lg" className="mt-4" />
    </div>
  ) : status === "error" ? (
      <div className="h-full w-full flex justify-center items-center">
        <h1 className="text-2xl text-white text-center">An Error Occured: {error.message}</h1>
      </div>
    ) : (
        <div className="h-full w-full p-4">
          {data.pages.map((page) => {
            return (
              <div key={page.currentPage} className="flex flex-col gap-2">
                {page.items.length > 0 ? page.items.map((post) => {
                  return (
                    <div key={post._id} className="flex justify-start gap-3 rounded-md bg-white text-black mb-3 p-4">
                      <Avatar src={post.author.avatar} alt="avatar" />
                      <p className="font-light text-sm truncate">{post.content}</p>
                    </div>
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
              <Spinner size="lg" />
            }
          </div>
        </div>
  )
}

export default ProfilePosts