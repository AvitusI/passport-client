import { useParams } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { RingLoader } from "react-spinners"

import { EditProfileComp } from "../components/ProfileChangeComps/EditProfileComp"

// /api/users/:userId

const fetchPost = async ({ queryKey }) => {
    const [, userId] = queryKey
    const response = await axios.get(`https://passport-server-production-a778.up.railway.app/api/users/${userId}`, { withCredentials: true })
    return response.data
}

const EditProfile = () => {

    const { userId } = useParams()

    const { data: user, status } = useQuery({
      queryKey: ["post", userId],
      queryFn: fetchPost
   })

    return status === "pending" ? (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
              <RingLoader color="orange" />
              <span className="text-xl">Just a moment...</span>
            </div>
        </div>
  ) : status === "error" ? (
      <div className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-3xl text-white text-center">
            Something went wromg. Try refreshing the page.
          </h1>
      </div>
    ) : (
    <EditProfileComp user={user} />
  )
}

export default EditProfile