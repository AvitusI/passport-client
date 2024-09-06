/* eslint-disable react/prop-types */
import { useEffect } from "react"
import axios from "axios"

import { SearchResults } from "./SearchResults"

export const Search = ({
    queryText,
    searchResults,
    setSearchResults
}) => {
    

    useEffect(() => {
        if (!queryText) {
            setSearchResults([])
            return
        }
        
        (async () => {
            const url = "http://localhost:5000/api/users/search"

            const { data } = await axios.get(url, {
                params: {
                    username: queryText
                },
                withCredentials: true
            })

            setSearchResults(data);
        })()


    }, [queryText, setSearchResults])

    return (
        <div>
            { queryText && (
                <div
                    className="overflow-y-auto max-h-[70vh] p-4"
                >
                    <div className="px-4">
                        <div className="border border-t-1 pt-2 pb-4">
                            <SearchResults searchResults={searchResults} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}