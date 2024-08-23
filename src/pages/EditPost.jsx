import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Spinner } from "@nextui-org/react"
import EditPostComp from "../components/PostUploadComps/EditPostComp"


const fetchPost = async ({ queryKey }) => {
    const [, id] = queryKey
    const response = await axios.get(`http://localhost:5000/api/posts/${id}`, { withCredentials: true })
    return response.data
}

const EditPost = () => {
  
  const { postId } = useParams()

  const { data: post, status, error } = useQuery({
      queryKey: ["post", postId],
      queryFn: fetchPost
   })

  return status === "pending" ? (
    <div className="h-screen w-screen flex justify-center items-center">
            <Spinner size="lg" />
        </div>
  ) : status === "error" ? (
      <div className="h-screen w-screen flex justify-center items-center">
                <h1 className="text-3xl text-white text-center">An Error Occured: { error.message}</h1>
            </div>
    ) : (
    <EditPostComp post={post} />
  )
}

export default EditPost