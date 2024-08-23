/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const ListDetails = ({ type, children, onOpen, postId }) => {

  return type === "edit" ? (
    <Link to={`/edit/post/${postId}`}>
      <div className={`text-black rounded-lg p-2 my-2 hover:bg-slate-400 cursor-pointer`}>
          <p className="text-lg tracking-wide font-semibold">{children}</p>
      </div>
    </Link>
  ) : (
        <>
            <div className={`text-red-600 rounded-lg p-2 my-2 hover:bg-slate-400 cursor-pointer`} onClick={onOpen}>
                <p className="text-lg tracking-wide font-semibold">{children}</p>
              </div>
        </>
  )
}

export default ListDetails