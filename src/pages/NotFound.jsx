import { useNavigate } from "react-router-dom"
import { TriangleAlert } from "lucide-react"
import { Button } from "@nextui-org/react"

export default function NotFound() { 

    const navigate = useNavigate()

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <TriangleAlert size={48} className="text-orange-500" />
                <h1 className="text-4xl text-white font-bold">404</h1>
                <p className="text-white text-xl">Page not found</p>
                <Button
                    className="text-white bg-orange-500"
                    size="lg"
                    onClick={() => navigate("/feed")}
                >
                    Feed
                </Button>
            </div>
        </div>
    )
}