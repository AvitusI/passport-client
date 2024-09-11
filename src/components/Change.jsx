import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

// Sparkles from lucide-react

import { useUser } from "../context/UserContext"

import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    ModalFooter,
    Button,
} from "@nextui-org/react"
import { toast } from "react-toastify"

const logout = async () => {
    const { data } = await axios.post("https://shownext-tav7bg80.b4a.run/api/auth/logout", {},  { withCredentials: true })
    return data
}

export const Change = () => {

    const { updateUser } = useUser()

    const navigate = useNavigate()

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    
    const { mutate, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            updateUser(null)
            navigate("/requestResetPassword", { replace:  true  })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    return (
        <div
            className="rounded-full bg-gray-900 text-gray-100 p-6 cursor-pointer hover:bg-gray-700"
            onClick={onOpen}
        >
            <span className="text-xl">
                Change Password
            </span>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <span className="">Your session will be terminated. You will have to login again</span>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex justify-between w-full">
                                    <Button onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button onClick={() => mutate()} isDisabled={isPending} className="bg-red-600 text-white">
                                        Proceed
                                    </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}