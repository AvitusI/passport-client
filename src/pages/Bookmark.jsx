import { useUser } from "../context/UserContext"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Post from "../components/Post"

export default function Bookmark() {

    const { user } = useUser()

    return (
        <>
            <div className="sticky top-0 z-50 flex justify-between p-6 border-b border-orange-500 h-20 bg-black">
                <Navbar />
            </div>
            <div className="min-h-screen flex p-3">
                <div className="sticky top-24 z-30 w-1/4 hidden lg:block h-[calc(100%-50px)]">
                    <Sidebar />
                </div>
                <div className="flex flex-col gap-2 w-[400px] pt-6 sm:pt-10">
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl text-center">Your Bookmarks</h1>
                    </div>
                    {user.bookmarks.length === 0 ? (
                        <div className="text-center w-full">
                            <span className="text-lg text-gray-400">No bookmarks yet.</span>
                        </div>                       
                    ) : (
                            user.bookmarks.map((post) => (
                                <Post key={post._id} post={post} />
                            ))
                    )}
                </div>
            </div>
        </>
    )
}