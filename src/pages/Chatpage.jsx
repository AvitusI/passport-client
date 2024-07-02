// import { Menu } from "lucide-react"

import MyChats from "../components/Chat/MyChats";
import ChatBox from "../components/Chat/ChatBox";

const Chatpage = () => {

  return (
      <div>
          <div>
              <div className="h-screen relative flex flex-col bg-gray-50">
                  {/* ALREADY IMPLEMENTED IN THE APP */}
                  {/*
                  <nav className="flex-shrink-0 bg-red-600">
                      <div className="max-w-7xl mx-auto px-2 sm-x-4 lg:px-8">
                          <div className="relative flex items-center justify-between h-16">
                              <div></div>

                              <div className="flex lg:hidden">
                                  <button className="bg-red-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-600 focus:ring-white">
                                    <Menu />
                                  </button>
                              </div>

                              <div className="hidden lg:block lg:w-80">
                                  <div className="flex items-center justify-end">
                                      <div className="flex">
                                          <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white">
                                              Chat
                                          </a>
                                      </div>

                                      <div className="ml-4 relative flex-shrink-0">
                                          <div>
                                              <button
                                                  className="bg-red-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-white"
                                              >
                                                  <img
                                                      className="h-8  w-8 rounded-full"
                                                      src="/images/milk.jpg"
                                                  />
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </nav>
                    */}
                    {/* NAV SECTION ENDS HERE */}
                  {/* Chat layout starts here */}
                  <div className="flex-grow w-full max-w-7xl mx-auto flex">
                      <div className="flex-1 min-w-0 bg-white flex">
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