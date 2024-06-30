/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const SidebarCard = ({ url, name, icon }) => {
  return (
      <div className="flex p-2 rounded-md space-x-5 justify-center items-center text-orange-500 mb-2">
          {icon}
          <Link to={url}>{ name }</Link>
    </div>
  )
}

export default SidebarCard