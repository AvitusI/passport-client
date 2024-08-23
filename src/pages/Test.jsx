import { useState } from "react"
import {
    Button, Card, CardHeader, CardBody, CardFooter, Avatar, Image, Slider,
    Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure
 } from "@nextui-org/react"
import { HeartIcon, Repeat1Icon, SkipBack, PauseCircleIcon, SkipForward, ShuffleIcon } from "lucide-react"

const Test = () => {

    const [isFollowed, setIsFollowed] = useState(false)
    const [liked, setLiked] = useState(false)

    const { onOpen, isOpen, onOpenChange} = useDisclosure()

  return (
      <div className="h-screen flex justify-center items-center">
          <div className="flex flex-col gap-4">
              <Card className="max-w-[340px] bg-black ring-4 ring-orange-500 rounded-lg p-2">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src="/images/image4.jpg"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                        </div>
                    </div>
                    <Button
                        className={isFollowed ? "bg-blue text-white border-default-200" : ""}
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={isFollowed ? "bordered" : "solid"}
                        onPress={() => setIsFollowed(!isFollowed)}
                    >
                        {isFollowed ? "Unfollow" : " Follow"}
                    </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                    </p>
                    <span className="pt-2">
                        #FrontendWithZoey
                        <span className="py-2" aria-label="computer" role="img">
                            💻
                        </span>
                    </span>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1 items-center">
                        <p className="font-semibold text-white/70 text-xl">4</p>
                        <p className="text-default-400 text-small">Posts</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="font-semibold text-white/70 text-xl">4</p>
                        <p className="text-default-400 text-small">Following</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="font-semibold text-white/70 text-xl">97.1K</p>
                        <p className="text-default-400 text-small">Followers</p>
                    </div>
                </CardFooter>
              </Card>
              
              <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] bg-gradient-to-br from-red-300 to-pink-600"
                shadow="sm"
            >
                <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                        <div className="relative col-span-6 md:col-span-4">
                            <Image
                                alt="Album cover"
                                className="object-cover"
                                height={200}
                                shadow="md"
                                src="/images/image4.jpg"
                                width="100%"
                            />
                        </div>

                        <div className="flex flex-col col-span-6 md:col-span-8">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0">
                                    <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                                    <p className="text-small text-foreground/80">12 Tracks</p>
                                    <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
                                </div>
                                <Button
                                    isIconOnly
                                    className="text-orange-500 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                    radius="full"
                                    variant="light"
                                    onPress={() => setLiked((v) => !v)}
                                >
                                    <HeartIcon
                                        className={liked ? "[&>path]:stroke-transparent" : ""}
                                        fill={liked ? "currentColor" : "none"}
                                    />
                                </Button>
                            </div>

                            <div className="flex flex-col mt-3 gap-1">
                                <Slider
                                    aria-label="Music progress"
                                    classNames={{
                                        track: "bg-default-500/30",
                                        thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                                    }}
                                    color="foreground"
                                    defaultValue={33}
                                    size="sm"
                                />
                                <div className="flex justify-between">
                                    <p className="text-small">1:23</p>
                                    <p className="text-small text-foreground/50">4:32</p>
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-center">
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    <Repeat1Icon className="text-foreground/80" />
                                </Button>
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    <SkipBack />
                                </Button>
                                <Button
                                    isIconOnly
                                    className="w-auto h-auto data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    <PauseCircleIcon size={54} />
                                </Button>
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    <SkipForward />
                                </Button>
                                <Button 
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    <ShuffleIcon className="text-foreground/80" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardBody>
              </Card>
              
              <div className={`text-red-600 rounded-lg p-2 my-2 hover:bg-slate-400 cursor-pointer`} onClick={onOpen}>
                <p className="text-lg tracking-wide font-semibold">Open modal</p>
              </div>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                      {(onClose) => (
                          <>
                              <ModalHeader>Are you sure?</ModalHeader>
                              <ModalBody>
                                  <p>This action is irreversible</p>
                              </ModalBody>
                              <ModalFooter>
                                  <Button onCl={onClose}>Cancel</Button>
                                  <Button color="danger">Proceed</Button>
                              </ModalFooter>
                          </>
                      )}
                  </ModalContent>
              </Modal>
          </div>
      </div>
  )
}

export default Test