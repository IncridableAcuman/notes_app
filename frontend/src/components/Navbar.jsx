import {FaSun} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate=useNavigate();
  return (
    <>
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-indigo-600 text-white">
        <div className="left">
            <h1 className='text-3xl font-bold cursor-pointer hover:text-slate-200 transition'>Notes App.</h1>
        </div>
        <div className="right flex gap-5 items-center">
            <FaSun className='text-xl'/>
            <button className='bg-slate-100 text-black px-6 py-2
             rounded-full border-none outline-none cursor-pointer
              hover:bg-slate-200 transition' onClick={()=>navigate('/login')}>Login</button>
        </div>
    </div>
    </>
  )
}

export default Navbar