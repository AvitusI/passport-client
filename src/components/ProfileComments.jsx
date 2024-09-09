/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios" 
import { useInView } from "react-intersection-observer"
import { Avatar } from "@nextui-org/react"
import { PuffLoader, ClipLoader } from "react-spinners"

const fetchProfileComments = async ({ queryKey, pageParam }) => {
  const [, userId] = queryKey
  const response = await axios.get(`http://localhost:5000/api/comments/${userId}?page=${pageParam}`, { withCredentials: true })
  return response.data
}


const ProfileComments = ({ userId }) => {

  const { ref, inView } = useInView()
  
  const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['profileComments', userId],
        queryFn: fetchProfileComments,
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
                <span className="text-sm">Fetching comments...</span>
            </div>
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
                {page.items.length > 0 ? page.items.map((comment) => {
                  return (
                    <Link key={comment._id} to={`/post/${comment.postId}`}>
                    <div className="grid grid-cols-custom items-center bg-gray-900 text-gray-200 mb-3 p-4 rounded-lg cursor-pointer">
                      <Avatar src={comment.userId.avatar} size="sm" alt="avatar" />
                      <p className="font-light text-sm truncate">{comment.content}</p>
                      </div>
                    </Link>
                  )
                }) : <div>
                    <p className="text-lg text-center text-white pt-6">
                       No comments yet.
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

export default ProfileComments