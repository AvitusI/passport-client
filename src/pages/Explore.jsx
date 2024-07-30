import { useQuery } from "@tanstack/react-query"
import axios from "axios" 
import { Spinner } from "@nextui-org/react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import UserCard from "../components/UserCard"

const fetchUsers = async () => {
  const { data } = await axios.get(`http://localhost:5000/api/users`, { withCredentials: true })
  return data
}

const Explore = () => {

  const { data, status, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })
  return status === 'pending' ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  ) : status === 'error' ? (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-3xl text-white text-center">{error.message}</h1>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-5 p-3 sm:p-4">
              {data.map((user) => <UserCard key={user._id} user={user} />)}
            </div>
          </div>
        </>
  )
}

export default Explore