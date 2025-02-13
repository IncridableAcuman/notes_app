import Navbar from "../components/Navbar"
import assets from '../assets/assets';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Auth = () => {
    const navigate=useNavigate();
    useEffect(()=>{
      if(localStorage.getItem('accessToken')){
        navigate('/');
      }
    },[navigate])
  return (
    <>
        <Navbar/>
        <div className="bg-gradient-to-br from-blue-300 to-purple-400 w-full h-screen flex items-center justify-center">
           <div className="text-center flex flex-col items-center">
           <img src={assets.success} className="rounded-full mb-4" alt="" />
            <h1 className="text-xl text-white font-semibold">Hi Developer</h1>
            <h2 className="text-indigo-500 text-4xl font-bold">Continue your successful future with us.</h2>
            <button className="bg-gradient-to-br from-indigo-300 to-indigo-600
             text-white px-6 py-2 mt-4 rounded cursor-pointer shadow-lg" onClick={()=>navigate('/login')}>Join Now</button>
           </div>
        </div>
    </>
  )
}

export default Auth