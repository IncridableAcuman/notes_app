import { FaPen, FaThumbtack } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"

const Post = () => {
  return (
    <>
     <div className="bg-gradient-to-br from-slate-300 to-slate-400 w-full h-screen flex items-center justify-between">
      <div className=" w-full max-w-sm">
        <div className="bg-indigo-400 p-5 rounded-lg shadow-lg">
          {/* Title */}
          <h1 className="text-xl font-bold text-white">Add your Task</h1>

          {/* Created At Section */}
          <div className="flex justify-between items-center mt-2 text-white">
            <span className="text-sm">Created At</span>
            <FaThumbtack className="text-lg" />
          </div>

          {/* Content */}
          <div className="mt-4 text-white text-sm bg-indigo-500 p-3 rounded-md">
            Add your content for task
          </div>

          {/* Hashtag and Actions */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-white text-sm">#hashtag</p>
            <div className="flex gap-2 text-white">
              <FaPen className="cursor-pointer hover:text-blue-200" />
              <MdDelete className="cursor-pointer hover:text-red-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Post