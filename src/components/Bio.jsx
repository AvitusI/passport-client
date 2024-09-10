/* eslint-disable react/prop-types */
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure
} from "@nextui-org/react"

export const Bio = ({ bio }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <span className="text-sm italic text-white cursor-pointer" onClick={onOpen}>more</span>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    <ModalHeader>
                        <div className="w-full text-center">
                            <h1 className="text-xl font-semibold">Full bio</h1>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="h-full w-full p-4">
                            <p className="text-default-500 text-lg">{bio}</p>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}