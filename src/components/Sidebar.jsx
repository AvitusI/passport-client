import {
    SquareUserRound,
    Telescope,
    MessageCircle,
    Cog,
    Newspaper
} from "lucide-react"
import { Image } from "@nextui-org/react"

import { useUser } from "../context/UserContext"
import SidebarCard from "./SidebarCard"
import Logout from "./Logout"
import { SearchModal } from "./SearchComps/SearchModal"

const routes = [
    {
        url: '/profile',
        name: 'Profile',
        icon: <SquareUserRound />
    },
    {
        url: '/feed',
        name: 'Feed',
        icon: <Newspaper />
    },
    {
        url: '/explore',
        name: 'Explore',
        icon: <Telescope />
    },
    {
        url: '/chat',
        name: 'Messenger',
        icon: <MessageCircle />
    },
    {
        url: '/settings',
        name: 'Settings',
        icon: <Cog />
    }
]

const Sidebar = () => { 

    const { user } = useUser()

    routes[0].url = `/profile/${user._id}`

    return (
        <div className="p-3 flex flex-col justify-between">
            <div className="flex flex-col mb-6 lg:mb-12">
                <div className="flex p-4 items-center justify-center mb-2">
                    <Image src={user.avatar} alt="avatar" className="h-24 w-24" radius="lg"  />
                </div>
                <div className="flex justify-center items-center mb-2">
                    <SearchModal />
                </div>
                {routes.map((route) => (
                    <SidebarCard
                        key={route.name}
                        url={route.url}
                        name={route.name}
                        icon={route.icon}
                    />
                ))}
            </div>
            <Logout />
        </div>
    )
}

export default Sidebar