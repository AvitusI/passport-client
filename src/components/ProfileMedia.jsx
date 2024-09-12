/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import { Image } from "@nextui-org/react"
import { PuffLoader } from "react-spinners"

const retrieveMedia = async ({ queryKey }) => {
  const [,userId] = queryKey
  const { data } = await axios.get(`https://shownext1-7sh63dv9.b4a.run/api/media/${userId}`, { withCredentials: true })
  return data
}

const ProfileMedia = ({ userId }) => {

  const { data, status } = useQuery({
    queryKey: ['profileMedia', userId],
    queryFn: retrieveMedia
  })
  
  return status === "pending" ? (
    <div className="h-full w-full flex justify-center items-center">
          <div className="flex flex-col gap-2 items-center">
                <PuffLoader color="orange" />
                <span className="text-sm">Fetching media...</span>
            </div>
    </div>
  ) : status === "error" ? (
      <div className="h-full w-full flex justify-center items-center">
        <h1 className="text-2xl text-white text-center">
          Network error occured. Try refreshing the page.
        </h1>
      </div>
    ) : (
        <div className="w-full h-full p-4">
          {data.length > 0 ? (
            <div className="mx-auto my-2 grid grid-cols-3 gap-2">
              {data.map((img) => (
                <Link key={img._id} to={`/post/${img._id}`}>
                  <Image className="aspect-square w-full object-cover rounded-md" src={img.pic} alt="img" />
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