import { Button } from "@nextui-org/react"
import { SquareCheckBig } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ActivatedCard = () => {

    const navigate = useNavigate()

  return (
      <div className="flex flex-col gap-3 p-4 border-2 border-orange-500 rounded-lg">
          <div className="flex justify-center items-center gap-2 sm:gap-3 p-2 border-b-1 border-orange-500">
              <SquareCheckBig />
              <p className="text-2xl font-bold text-center">Successfully Activated</p>
          </div>
          <div className="p-2 mt-1 mb-1">
              <p className="text-xl mb-1">Hi</p>
              <p className="mb-1">Congratulations! your account is now active.</p>
              <p>Head over to your cool feed and enjoy the experience.</p>
          </div>
          <div className="flex justify-center items-center p-2">
              <Button
                  className="text-2xl text-white bg-orange-500"
                  onClick={() => navigate('/feed')}
              >
                  To Your Feed
              </Button>
          </div>
    </div>
  )
}

export default ActivatedCard