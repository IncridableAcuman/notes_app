import { useContext, useEffect, useState } from "react"
import SecondNav from "../components/SecondNav"
import {FaUser,FaEnvelope,FaLock} from 'react-icons/fa'
import axiosInstance from '../api/api'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../contexts/UserProvider"
const Login = () => {
    const [state,setState]=useState("Sign Up");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const {login}=useContext(UserContext)
    const handleSubmit=async (e)=>{
      e.preventDefault();
      if( state === "Sign Up" ){
        try {
        const {data}=await axiosInstance.post('/auth/signup',{name,email,password});
        login(data);
        navigate('/');
        toast.success(data?.message || "Registration complated successfully");
        } catch (error) {
          toast.error(error?.response?.data?.message || "Registration failed!");
        }     
      } else{
        try {
          const {data}=await axiosInstance.post('/auth/login',{email,password});
          login(data);
          navigate('/');
          toast.success(data?.message || "Login successfully");
        } catch (error) {
          toast.error(error?.response?.data?.message || "Login failed!");
        }
      }
    }
    useEffect(()=>{
      if(localStorage.getItem('accessToken')){
        navigate('/');
      }
    },[navigate])
  return (
    <>
    <SecondNav/>
    <div className="bg-gradient-to-br from-blue-400 to-indigo-400 w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center bg-slate-900 rounded-xl p-20 text-white">
            <h2 className="text-3xl font-bold mb-4">{state === "Sign Up" ? "Create Account" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                {state === "Sign Up" && (
                  <div className="flex items-center gap-3 w-full mb-4 px-10 py-2.5 rounded-full bg-[#333a5c]">
                    <FaUser/>
                    <input type="text" placeholder="Your Name"
                     className="bg-transparent outline-none" required value={name} onChange={(e)=>setName(e.target.value)} />
                </div>  
                )}   
                <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
                    <FaEnvelope/>
                    <input type="email" placeholder="example@gmail.com" className="bg-transparent outline-none"
                     required value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c] mt-4">
                    <FaLock/>
                    <input type="password" placeholder="Password" className="bg-transparent outline-none" 
                    required value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button className="bg-gradient-to-br from-indigo-500 to-indigo-900
                 cursor-pointer mt-3 w-full px-5 py-2 rounded-full">{state}</button>
            </form>
            { state === "Sign Up" ? (
            <p className="mt-3 text-slate-600">Already have an  account?{" "}<span className="text-white hover:underline cursor-pointer" onClick={()=>setState("Sign In")}>Sign In</span></p>

            ) : (
            <p className="text-slate-700">Don`t have an account?{" "}<span className="text-white hover:underline cursor-pointer" onClick={()=>setState("Sign Up")}>Sign Up</span></p>
            )}
        </div>
    </div>
    </>
  )
}

export default Login