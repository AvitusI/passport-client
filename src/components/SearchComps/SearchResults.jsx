/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Avatar } from "@nextui-org/react"

import { useUser } from "../../context/UserContext"

const messageUser = async (sentData) => {
    const { data } = await axios.post(`https://shownext1-7sh63dv9.b4a.run/api/chat`, sentData, { withCredentials: true })
    return data
}

export const SearchResults = ({
    searchResults,
    isChat,
    onClose
}) => {

    const { setSelectedChat } = useUser()

    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: messageUser,
        onSuccess: (data) => {
            setSelectedChat(data[0])
            onClose()
            navigate('/chat')
        }
    })

    const handleClick = (user) => {
        if (isChat) {
            mutate({ userId: user._id })
        }
        else {
            navigate(`/profile/${user._id}`)
        }
    }

    return (
        <div className="grid gap-y-[1rem]">
            {searchResults.slice(0, 3).map((user) => (
                <div
                    key={user._id}
                    className="hover:bg-orange-400 hover:text-white text-black cursor-pointer"
                    onClick={() => handleClick(user)}
                >
                    <div className="grid grid-cols-custom gap-y-[1rem] h-[70px] overflow-hidden items-center">
                        <div className="ml-2">
                            <Avatar src={user.avatar} />
                        </div>
                        <div className="p-2">
                            <p className="text-lg">{user.username}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}