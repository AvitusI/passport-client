/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@nextui-org/react";

import { useUser } from "../context/UserContext";
import { queryClient } from "../main";


const CustomButton = ({ data }) => {

    const { user } = useUser()
    
    const followStatus = data.followers.some(follower => follower._id === user._id)

    const [isFollowed, setIsFollowed] = useState(followStatus)

    const sendFollowData = async (sentData) => {
        if (followStatus) {
            const { data } = await axios.post(`http://localhost:5000/api/users/unfollow`, sentData, { withCredentials: true })
            return data
        }
        else {
            const { data } = await axios.post(`http://localhost:5000/api/users/follow`, sentData, { withCredentials: true })
            return data
        }
    }

    const { mutate, isPending } = useMutation({
        mutationFn: sendFollowData,
        onSuccess: () => {
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
          isDisabled={isPending}
          onClick={followAction}
      >
          {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  )
}

export default CustomButton