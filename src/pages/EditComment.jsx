import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Spinner } from "@nextui-org/react"
import { EditCommentComp } from "../components/EditCommentComp"

const fetchComment = async ({ queryKey }) => {
    const [, commentId] = queryKey
    const response = await axios.get(`http://localhost:5000/api/comment/${commentId}`, { withCredentials: true })
    return response.data
}

const EditComment = () => {

  const { commentId } = useParams()

  const { data: comment, status } = useQuery({
      queryKey: ["comment", commentId],
      queryFn: fetchComment
  })
  
  return status === "pending" ? (
    <div className="h-screen w-screen flex justify-center items-center">
            <Spinner size="lg" />
        </div>
  ) : status === "error" ? (
      <div className="h-screen w-screen flex justify-center items-center">
                <h1 className="text-xl text-white text-center">Something strange occured. Try refreshing the page</h1>
            </div>
    ) : (
    <EditCommentComp comment={comment} />
  )
}

export default EditComment