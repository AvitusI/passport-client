import { Avatar } from "@nextui-org/react"

const followers = [
    {
        name: "John Doe",
        avatar: "/images/baloon.jpg",
    },
    {
        name: "Jane Doe",
        avatar: "/images/honey.jpg",
    },
    {
        name: "John Smith",
        avatar: "/images/milk.jpg",
    },
]

const FeedBar = () => {
  return (
      <div className="flex gap-6 sm:gap-10 p-4">
          {followers.map((follower) => (
              <Avatar key={follower.name} src={follower.avatar} alt={follower.name} isBordered color="warning" className="sm:w-20 sm:h-20 h-18 w-18"/>
          ))}
    </div>
  )
}

export default FeedBar