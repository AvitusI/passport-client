import { useQuery } from "@tanstack/react-query"
import axios from "axios" 

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import UserCard from "../components/UserCard"
import { RingLoader } from "react-spinners"

const fetchUsers = async () => {
  const { data } = await axios.get(`http://localhost:5000/api/users`, { withCredentials: true })
  return data
}

const Explore = () => {

  const { data, status } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })
  return status === 'pending' ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <RingLoader color="orange" />
        <span className="text-xl">Just a moment...</span>
      </div>
    </div>
  ) : status === 'error' ? (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-3xl text-white text-center">
          Network error occured. Try refreshing the page.
        </h1>
      </div>
    ) : (
        <>
          <div className="sticky top-0 z-50 flex justify-between p-6 border-b border-orange-500 h-20 bg-black">
                <Navbar />
          </div>
          <div className="min-h-screen flex p-3">
                {/* Sidebar */}
                <div className="sticky top-24 z-30 w-1/4 hidden lg:block h-[calc(100%-50px)]">
                    <Sidebar />
            </div>
            {/* Users section */}
            <div className="flex flex-col gap-2 w-[400px] pt-6 sm:pt-10">
              <div className="mb-4 sm:mb-6">
                <h1 className="text-2xl text-center">All Users</h1>
              </div>
              {data.map((user) => <UserCard key={user._id} user={user} />)}
            </div>
          </div>
        </>
  )
}

export default Explore