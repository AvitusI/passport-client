/* eslint-disable react/prop-types */
import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure
} from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

import { Search } from "./Search";

export const SearchModal = ({ isChat }) => {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  
  const [queryText, setQueryText] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleChange = (e) => setQueryText(e.target.value)

  return (
    <>
          <button
              onClick={onOpen}
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-orange-500 focus:outline-none hover:bg-orange-500 hover:text-white"
           >
            <SearchIcon />
        </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
      >
        <ModalContent>
          {() => (
            <>
                          <ModalHeader>
                              <div className="mb-6 w-full p-4">
                                          <div className="relative">
                                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                  <SearchIcon className="text-gray-500"/>
                                              </div>
                                              <input
                                                  name="search"
                                                  placeholder="Search user"
                                                  value={queryText}
                                                  onChange={handleChange}
                                                  className="focus:ring-orange-500 focus:border-orange-500 focus:outline-none block w-full pl-10 sm:text-sm border-gray-500 rounded-full p-2 border placeholder:gray-500"
                                              />
                                          </div>
                                      </div>
              </ModalHeader>
              <ModalBody className="p-2">
                <Search
                  queryText={queryText}
                  setQueryText={setQueryText}
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  isChat={isChat}
                  onClose={onClose}
                />
              </ModalBody>
            
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
