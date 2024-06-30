import { useState } from 'react'
import { X, Menu, Bell } from 'lucide-react'
import { Avatar, Badge, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'

import { useUser } from "../context/UserContext"
import Sidebar from './Sidebar'

const Navbar = () => {

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const { user, notifications } = useUser()

  const toggleMobileDrawer = () => { 
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  return (
    <div className='container relative sm:px-4 px-2 mx-auto lg:text-sm'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center flex-shrink-0'>
          <p className='uppercase text-orange-500'>Logo</p>
          <p className='text-orange-500'>LG Pic</p>
        </div>

        <div className='flex justify-end'>
          <div className="flex justify-center items-center sm:mr-4 mr-2">
                <Badge
                                content={notifications?.length ? notifications.length : null}
                                color="warning"
                                shape="circle"
                                showOutline={false}
                                placement="top-left"
                >
                  <Popover placement='bottom' color='warning' showArrow={true} className='sticky z-50'>
                    <PopoverTrigger>
                      <Bell size={36} className="mr-4 sm:mr-6" />
                    </PopoverTrigger>
                    <PopoverContent>
                      {notifications?.length ? (
                          notifications.map((notification) => (
                            <div key={notification._id} className="flex items-center justify-between p-2 border-b border-gray-200">
                              <p className="text-sm">{notification.message}</p>
                            </div>
                          ))
                        ) : (
                            <div className="p-2">
                                <p className="text-sm">No new notifications</p>
                            </div>
                          )}
                    </PopoverContent>
                  </Popover>
                </Badge>
                <Avatar isBordered src={user.avatar} radius="full" className="size-10" />
          </div>
          <button className="lg:hidden md:flex ml-2" onClick={toggleMobileDrawer}>
            {mobileDrawerOpen ? <X size={36} /> : <Menu size={36} /> }
          </button>
        </div>
      </div>
      {mobileDrawerOpen && (
        <div className='fixed left-0 z-20 w-3/4 bg-black bg-opacity-90 lg:hidden h-[calc(100%-60px)]'>
          <Sidebar />
        </div>
      )}
    </div>
  )
}

export default Navbar