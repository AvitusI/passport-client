/* eslint-disable react/prop-types */
export const SearchResults = ({ searchResults }) => {

    return (
        <div className="grid gap-y-[1rem]">
            {searchResults.slice(0, 3).map((user) => (
                <div
                    key={user._id}
                    className="hover:bg-orange-400 hover:text-white text-black"
                >
                    <div className="grid grid-cols-custom gap-y-[1rem] h-[70px] overflow-hidden">
                        <div className="ml-2">
                            <img src={user.avatar} className="w-full h-full object-cover rounded-md"/>
                        </div>
                        <div className="p-2">
                            <p className="text-lg">{user.username}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}