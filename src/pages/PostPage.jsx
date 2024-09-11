import { useParams } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { RingLoader } from "react-spinners"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Post from "../components/Post"
import CommentCard from "../components/CommentCard"
import Comment from "../components/Comment"

const fetchPost = async ({ queryKey }) => {
    const [, id] = queryKey
    const response = await axios.get(`https://passport-server-production-a778.up.railway.app/api/posts/${id}`, { withCredentials: true })
    return response.data
}

const PostPage = () => {

    const { id } = useParams();

    const { data: post, status, error } = useQuery({
        queryKey: ["post", id],
        queryFn: fetchPost
    })

    return status === 'pending' ? (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col gap-2 items-center">
                <RingLoader color="orange" />
                <span className="text-xl">Just a moment...</span>
            </div>
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
                {/* Post column */}
                <div className="w-full lg:w-1/3 p-6">
                    {/* Comment section */}
                    <div className="mt:4 sm:mt-6">
                                <Post post={post} />
                                <div className="mt-4 ml-4">
                                    <CommentCard postId={id}/>
                                </div>
            
                                <div className="mt-4">
                                    {post.comments.map((comment) => (
                                        <Comment key={comment._id} comment={comment} />
                                    ))}
                                </div>
                                
                    </div>
                </div>
                {/*  blank column in large devices*/}
                <div className="w-1/3 hidden lg:block">

                </div>
            </div>
      </>
  )
}

export default PostPage