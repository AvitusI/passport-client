// import { Menu } from "lucide-react"

import MyChats from "../components/Chat/MyChats";
import ChatBox from "../components/Chat/ChatBox";

const Chatpage = () => {

  return (
      <div>
          <div>
              <div className="h-screen relative flex flex-col bg-black">
                  {/* Chat layout starts here */}
                  <div className="flex-grow w-full max-w-7xl mx-auto flex">
                      <div className="flex-1 min-w-0 bg-black flex">
                          {/* Goes into MyCharts component */}
                          <MyChats />

                          {/* MIDDLE CONTENT START */}
                          {/* Goes into ChatBox component */}
                          <ChatBox /> 
                      </div>

                        {/* We won't have this last column, but is a good place to practice, xl:block */}
                      <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden">
                          <div className="h-full pl-6 py-6 lg:w-80">
                              <div className="h-full relative">
                                  <div className="m-auto text-center text-black/70 mb-10">
                                      <img
                                          className="w-36 h-36 rounded-full m-auto"
                                          src="/images/milk.jpg"
                                      />
                                      <h2 className="m-auto text-2xl mt-2">Kina Mayer</h2>
                                  </div>

                                  <div className="mb-2 text-black/70">
                                      <h4>Attachments</h4>
                                  </div>

                                  <div className="grid grid-cols-4 gap-2">
                                      <div>
                                          <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                                      </div>
                                      <div>
                                          <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                                      </div>
                                      <div>
                                          <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                                      </div>
                                      <div>
                                          <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                                      </div>
                                      <div>
                                          <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                                      </div>
                                      <div>
                                          <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                                      </div>
                                      <div>
                                          <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                                      </div>
                                      <div>
                                          <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Chatpage;