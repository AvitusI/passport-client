/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@nextui-org/react";

import { useUser } from "../context/UserContext";
import { queryClient } from "../main";
import { socket } from "../utils";


const CustomButton = ({ data }) => {

    const { user } = useUser()
    
    const followStatus = data.followers.some(follower => follower._id === user._id)

    const [isFollowed, setIsFollowed] = useState(followStatus)

    const sendFollowData = async (sentData) => {
        if (followStatus) {
            const { data } = await axios.post(`https://shownext-tav7bg80.b4a.run/api/users/unfollow`, sentData, { withCredentials: true })
            return data
        }
        else {
            const { data } = await axios.post(`https://shownext-tav7bg80.b4a.run/api/users/follow`, sentData, { withCredentials: true })
            return data
        }
    }

    const awaitNotification = () => {
        setTimeout(() => { socket.emit("new_notification") }, 1000)
    }

    const { mutate, isPending } = useMutation({
        mutationFn: sendFollowData,
        onSuccess: () => {
            if (isFollowed) {
                awaitNotification()
            }
            setIsFollowed(!isFollowed)
            queryClient.invalidateQueries(["user", data._id])
        },
        onError: (error) => {
            console.log(error)
        } 
    })

    const followAction = () => {
        mutate({ userId: data._id })
    }

  return (
      <Button
          className="text-white bg-orange-500"
          radius="full"
          size="sm"
          isDisabled={isPending}
          onClick={followAction}
      >
          {isFollowed ? "Following" : "Follow"}
    </Button>
  )
}

export default CustomButton