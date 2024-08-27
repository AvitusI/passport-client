/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import { Spinner } from "@nextui-org/react"

const retrieveMedia = async ({ queryKey }) => {
  const [,userId] = queryKey
  const { data } = await axios.get(`http://localhost:5000/api/media/${userId}`, { withCredentials: true })
  return data
}

const ProfileMedia = ({ userId }) => {

  const { data, error, status } = useQuery({
    queryKey: ['profileMedia', userId],
    queryFn: retrieveMedia
  })
  
  return status === "pending" ? (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner size="lg" className="mt-4" />
    </div>
  ) : status === "error" ? (
      <div className="h-full w-full flex justify-center items-center">
        <h1 className="text-2xl text-white text-center">An Error Occured: {error.message}</h1>
      </div>
    ) : (
        <div className="w-full h-full p-4">
          {data.length > 0 ? (
            <div className="mx-auto my-10 columns-3 space-y-4">
              {data.map((img) => (
                <Link key={img._id} to={`/post/${img._id}`}>
                  <img className="aspect-square w-full object-cover rounded-md" src={img.pic} alt="img" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-lg text-center text-white pt-6">
              No media yet
            </p>
          )}
          </div>
    )
}

export default ProfileMedia