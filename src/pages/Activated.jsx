import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Spinner } from "@nextui-org/react"

import { useUser } from "../context/UserContext"
import ActivatedCard from "../components/ActivatedCard"

const activateAccount = async (sentData) => {
  const response = await axios.post(
    "http://localhost:5000/api/users/activateAccount",
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
          { isPending ? <Spinner size="lg"/> : ( <ActivatedCard />) }
    </div>
  )
}

export default Activated