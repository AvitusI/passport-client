/* eslint-disable react/prop-types */
import { Avatar, Button } from "@nextui-org/react"

const ProfileCard = ({ profile }) => {
  return (
      <div className="flex flex-col p-4 bg-white text-black space-x-4 rounded-lg items-center justify-between pr-6">
          <div className="flex justify-center items-center p-4">
              <Avatar src={profile.avatar} alt="avatar"  className="w-20 h-20" /> 
          </div>
          <p className="font-bold text-lg text-center mb-2">{profile.name}</p>
          <p className="font-light text-center mb-2">{`${profile.posts} ${profile.posts === 1 ? `post` : `posts`}`}</p>
          <Button className="bg-black w-full">Follow</Button>
    </div>
  )
}

export default ProfileCard