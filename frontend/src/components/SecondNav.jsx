import {FaBell} from 'react-icons/fa'
const SecondNav = () => {
  return (
    <>
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-indigo-600 text-white">
        <div className="">
        <h1 className='text-3xl font-bold cursor-pointer hover:text-slate-200 transition'>Notes App.</h1>
        </div>
        <div className="">
            <FaBell className='cursor-pointer'/>
        </div>
    </div>
    </>
  )
}

export default SecondNav