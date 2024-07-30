/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Button
} from "@nextui-org/react"

const UserCard = ({ user }) => {

  return (
    <Card className="py-4 w-50 bg-white text-black transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="size-40 object-cover rounded-xl"
                        src={user.avatar}
                        width="full"
                    />
              </CardBody>
              <CardFooter>
              <Button
                  className="w-full bg-orange-500 hover:bg-orange-600"
              >
                    <Link to={`/profile/${user._id}`}> See Profile </Link>
                  </Button>
              </CardFooter>
          </Card>
  )
}

export default UserCard