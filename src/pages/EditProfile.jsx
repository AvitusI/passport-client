import { useParams } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@nextui-org/react"

import { EditProfileComp } from "../components/ProfileChangeComps/EditProfileComp"

// /api/users/:userId

const fetchPost = async ({ queryKey }) => {
    const [, userId] = queryKey
    const response = await axios.get(`http://localhost:5000/api/users/${userId}`, { withCredentials: true })
    return response.data
}

const EditProfile = () => {

    const { userId } = useParams()

    const { data: user, status, error } = useQuery({
      queryKey: ["post", userId],
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
    <EditProfileComp user={user} />
  )
}

export default EditProfile