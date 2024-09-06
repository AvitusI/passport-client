/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"

const style = "flex p-2 rounded-md space-x-5 items-center text-orange-500 mb-2 hover:bg-orange-500 hover:text-white"

const SidebarCard = ({ url, name, icon }) => {
  return (
    <NavLink
      to={url}
      className={({ isActive }) => isActive ? style + " bg-orange-500 text-white" : style}
    >
          <div className="ml-16 mr-6">{icon}</div>
      <span>
        {name}
      </span>
    </NavLink>
  )
}

export default SidebarCard