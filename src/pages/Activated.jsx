import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { RingLoader } from "react-spinners"

import { useUser } from "../context/UserContext"
import ActivatedCard from "../components/ActivatedCard"

const activateAccount = async (sentData) => {
  const response = await axios.post(
    "https://passport-server-production-a778.up.railway.app/api/users/activateAccount",
    sentData,
    { withCredentials: true }
  )
  return response.data
}

const Activated = () => {

  const [searchParams] = useSearchParams();

  const { updateUser } = useUser()

  const token = searchParams.get('token')
  const userId = searchParams.get('id')

  const { mutate, isPending } = useMutation({
    mutationFn: activateAccount,
    onSuccess: (data) => {
      updateUser(data)
    },
    onError: (error) => {
      console.log(error.message)
    }
  })
  
  useEffect(() => {
    const doMutation = () => {
      mutate({ token, userId})
    }
    doMutation()
  }, [mutate,token, userId])

  return (
      <div className="h-screen w-screen p-4 flex items-center justify-center">
      {isPending ? (
        <div className="flex flex-col gap-2 items-center">
              <RingLoader color="orange" />
              <span className="text-xl">Just a moment...</span>
          </div>
      ) : (<ActivatedCard />)}
    </div>
  )
}

export default Activated