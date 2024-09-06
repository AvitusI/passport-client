import { useState } from "react"
import {
    Switch,
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    Image,
} from "@nextui-org/react"

export const TwoFactor = () => {

    const [isSelected, setIsSelected] = useState(false)

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const handleChange = () => {
        setIsSelected((value) => !value)
        if (!isSelected) {
            onOpen()
            setIsSelected((value) => !value)   
        }
    }

    return (
        <div className="flex justify-between items-start rounded-full bg-gray-800 text-gray-100 p-6">
            <span className="text-xl">
                Enable 2FA
            </span>
            <Switch isSelected={isSelected} onValueChange={handleChange} color="warning" />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    <ModalBody>
                        <div className="flex flex-col gap-2 items-center">
                            <Image src="/images/not-found.jpg" alt="soon" />
                            <span className="text-xl font-semibold">This feature is coming soon!</span>
                        </div>
                    </ModalBody>                      
                </ModalContent>
            </Modal>
        </div>
    )
}