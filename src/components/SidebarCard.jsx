/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const SidebarCard = ({ url, name, icon }) => {
  return (
      <div className="flex p-2 rounded-md space-x-5 items-center text-orange-500 mb-2 hover:bg-orange-500 hover:text-white">
          <div className="ml-16 mr-6">{icon}</div>
          <Link to={url}>{ name }</Link>
    </div>
  )
}

export default SidebarCard