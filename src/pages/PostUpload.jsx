import PostEdit from "../components/PostUploadComps/PostEdit"

const PostUpload = () => {
  return (
      <div className="h-screen w-screen p-4 sm:p-6 flex gap-3">
      <div
        className="hidden sm:w-1/3 sm:flex"
      >
              
          </div>
      <div
        className="w-full sm:w-1/3"
      >
              <PostEdit />
          </div>
      <div
        className="hidden sm:w-1/3 sm:flex"
      >
              
          </div>
      </div>
  )
}

export default PostUpload