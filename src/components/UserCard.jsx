/* eslint-disable react/prop-types */
import { Avatar, Button } from "@nextui-org/react"
import { Link } from "react-router-dom"

const UserCard = ({ user }) => {

  return (
    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 border border-orange-500">
        <div className="flex-shrink-0">
            <Avatar src={user.avatar} alt="avatar" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between flex-shrink-0">
                  <p className="text-white">{user.username}</p>
            </div>
        </div>
        <div className="flex items-center justify-between">
              <Link to={`/profile/${user._id}`}>
                <Button size="sm" className="bg-orange-500 text-white uppercase">
                    Profile
                </Button>
              </Link>
        </div>
    </div>
  )
}

export default UserCard