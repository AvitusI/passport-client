import { CheckCircle2 } from "lucide-react"

export default function Founder() {
    return (
        <div className="min-h-screen p-6 sm:p-12">
            <div className="flex flex-wrap justify-center">
                <div className="w-full sm:w-1/2 p-6 flex justify-center items-center sm:justify-start sm:fixed sm:left-2">
                    <img src="/images/founder.jpg" className="size-44 rounded-full object-cover"/>
                </div>
                <div className="w-full sm:w-1/2 p-2 sm:p-6">
                    <p>Hi,</p>
                    <p className="tracking-wide">I&apos;m Avitus, an aspirant developer. I work with JavaScript/TS technologies. I made this application using 
                        the MERN stack. Some interesting features I included:
                    </p>
                    <div className="mt-8">

                        <div className="flex mb-8">
                            <div
                                className="text-orange-500 mx-6 bg-neutral-900 size-10 p-2 justify-center items-center rounded-full"
                            >
                                <CheckCircle2 />
                            </div>
                            <div>
                                <p>
                                    Aunthentication with password and email verification
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-8">
                            <div
                                className="text-orange-500 mx-6 bg-neutral-900 size-10 p-2 justify-center items-center rounded-full"
                            >
                                <CheckCircle2 />
                            </div>
                            <div>
                                <p>
                                    OAuth authentication (Google, GitHub, and Discord)
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-8">
                            <div
                                className="text-orange-500 mx-6 bg-neutral-900 size-10 p-2 justify-center items-center rounded-full"
                            >
                                <CheckCircle2 />
                            </div>
                            <div>
                                <p>
                                    Account recovery
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-8">
                            <div
                                className="text-orange-500 mx-6 bg-neutral-900 size-10 p-2 justify-center items-center rounded-full"
                            >
                                <CheckCircle2 />
                            </div>
                            <div>
                                <p>
                                    User feed with infinite scrolling of posts ( I used React Query )
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-8">
                            <div
                                className="text-orange-500 mx-6 bg-neutral-900 size-10 p-2 justify-center items-center rounded-full"
                            >
                                <CheckCircle2 />
                            </div>
                            <div>
                                <p>
                                    User search autocomplete ( I used MongoDB Atlas Search )
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-8">
                            <div
                                className="text-orange-500 mx-6 bg-neutral-900 size-10 p-2 justify-center items-center rounded-full"
                            >
                                <CheckCircle2 />
                            </div>
                            <div>
                                <p>
                                    Real time chats ( I used Socket.IO )
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-8">
                            <div
                                className="text-orange-500 mx-6 bg-neutral-900 size-10 p-2 justify-center items-center rounded-full"
                            >
                                <CheckCircle2 />
                            </div>
                            <div>
                                <p>
                                    Follow, like, comment, bookmark, etc
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-8">
                            <div
                                className="text-orange-500 mx-6 bg-neutral-900 size-10 p-2 justify-center items-center rounded-full"
                            >
                                <CheckCircle2 />
                            </div>
                            <div>
                                <p>
                                    General notifications and messenger notifications
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-8">
                            <div
                                className="text-orange-500 mx-6 bg-neutral-900 size-10 p-2 justify-center items-center rounded-full"
                            >
                                <CheckCircle2 />
                            </div>
                            <div>
                                <p className="text-d">
                                    Image uploads ( I store them in cloudinary )
                                </p>
                            </div>
                        </div>

                    </div>

                    <p className="mb-8 tracking-wide">
                        For the moment, I didn&apos;t include video upload feature to prevent my storage bill from going weird 😣.
                        But I have got plans to implement it in the future. I might use AWS S3 which offers more storage.
                    </p>

                    <p className="mb-8 tracking-wide">
                        We can connect at <a href="#" className="underline italic">Linkedin</a> or <a href="#" className="underline italic">GitHub</a>.
                    </p>

                    <p>Thank you for paying a visit to my app 🙏</p>
                </div>
            </div>
        </div>
    )
}