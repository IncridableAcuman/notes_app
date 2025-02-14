import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPen, FaThumbtack } from "react-icons/fa6";
import {FaSearch} from 'react-icons/fa'
import {toast} from 'react-toastify'
import axiosInstance from "../api/api";
import { UserContext } from "../contexts/UserProvider";
import { MdDelete } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { MdContentPaste } from "react-icons/md";
import { CiHashtag } from "react-icons/ci";
const Home = () => {
  const navigate=useNavigate();
  const {user,logout}=useContext(UserContext);
  const [userData,setUserData]=useState(null);
  const [posts,setPosts]=useState([]);
  const [menuOpen,setMenuOpen]=useState(false);
  const [isOpen,setIsOpen]=useState(false);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [search,setSearch]=useState("");
  useEffect(()=>{
    if(!user){
      navigate('/auth');
    }
  },[user,navigate]);

  const handleLogout=async ()=>{
    try {
      await axiosInstance.post('/auth/logout');
      logout();
      toast.success("Logout Successfully");
      navigate('/auth');
    } catch (error) {
      toast.error(error?.message ||  "Logout failed");
    }
  }
  const getUserData=async ()=>{
    try {
      const {data}=await axiosInstance.get('/auth/data');
      setUserData(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
  useEffect(()=>{
    getUserData();
  },[user]);

  const getPosts=async ()=>{
    try {
      const {data}=await axiosInstance.get('/post/all-posts');
      setPosts(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
  useEffect(()=>{
    getPosts();
  },[posts]);

  const handleAddNotes=async (e)=>{
    e.preventDefault();
    try {
      const {data}=await axiosInstance.post('/post/create',{title,description});
      toast.success(data?.message || "Notes created successfully");
      setIsOpen(false);
      setMenuOpen(false);
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  const handleDeleteNotes=async (id)=>{
    try {
      await axiosInstance.delete(`/post/delete/${id}`);
      toast.success("Notes delted successfully");
      setPosts(posts.filter(post=>post.id !==id))
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  const handleTagSearch=async (e)=>{
    e.preventDefault();
    try {
      const {data}=await axiosInstance.get(`/post/get-all?title=${search}`);
      setPosts(data);
      toast.success("Search complated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  }

  return (
    <>
    <div className="fixed top-0 left-0 w-full flex items-center 
    justify-between px-8 py-3 bg-gradient-to-br from-indigo-600 to-indigo-900 text-white">
      <div className="">
      <h1 className='text-3xl font-bold cursor-pointer hover:text-slate-200 transition'>Notes App.</h1>
      </div>
      <div className="flex items-center gap-3 search bg-white text-black px-5 py-1.5 rounded-full">
        <input type="text" placeholder="Search"
         className="outline-none bg-transparent" value={search} 
         onChange={(e)=>setSearch(e.target.value)} onKeyPress={(e)=>{
          if(e.key === "Enter"){
            handleTagSearch(e);
          }
         }} />
        <FaSearch/>
      </div>
      <div className="flex items-center gap-3">
        {userData ? (
          <>
          <img src={userData.profilePicture}
           className="w-8 h-8 rounded-full cursor-pointer"
            alt="profile" onClick={()=>setMenuOpen(!menuOpen)} /> 

            {menuOpen && (
              <div className="absolute top-12 right-0 bg-white
              text-black rounded-lg shadow-lg py-2 w-40">
              <p className="px-4 py-2 border-b text-sm cursor-pointer hover:bg-slate-200 transition">{userData.name.split(" ")[0]}</p>
              <p className="px-4 py-2 border-b text-sm cursor-pointer
               hover:bg-slate-200 transition" onClick={()=>setIsOpen(!isOpen)}>Add Task</p>
               {isOpen && (
                <div className="absolute right-40
                 mx-auto bg-white text-black rounded-lg shadow-lg py-4 px-4 w-80">
                  <div className="w-full bg-slate-600 text-white px-3 py-1.5 rounded-2xl flex items-center gap-3">
                    <MdOutlineSubtitles/>
                    <input type="text" placeholder="Add your task title" 
                    className="bg-transparent outline-none" value={title} onChange={(e)=>setTitle(e.target.value)} required />
                  </div>
                  <div className="bg-slate-600 text-white mt-2 rounded-2xl flex items-center gap-3">
                    <MdContentPaste/>
                    <textarea name="" id="" cols="30" rows="10"
                     placeholder="Add your content"
                      className="bg-transparent outline-none px-2 py-1"
                       value={description} onChange={(e)=>setDescription(e.target.value)} required></textarea>
                  </div>
                  <div className="bg-slate-600 text-white mt-3 
                  rounded-2xl flex items-center gap-3 py-2">
                    <input type="text" placeholder="Add tags"
                     className="bg-transparent outline-none px-2"  />
                    <div className="flex items-center cursor-pointer" >
                      <CiHashtag/>
                      ADD
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-br from-indigo-600 to-indigo-950 
                  mt-2 rounded-full text-white py-1 cursor-pointer" onClick={handleAddNotes}>ADD NOTES</button>
                </div>
               )}
              <p className="px-4 py-2 border-b text-sm cursor-pointer hover:bg-slate-200 transition" onClick={handleLogout}>Logout</p>
              </div>
            )}
          </>
          
        ) : (
          <p className="bg-white text-black px-3 py-1 rounded-full cursor-pointer">P</p> 
        )}
        
      </div>
    </div>
    <div className="bg-gradient-to-br from-slate-300 to-slate-400 w-full min-h-screen grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 p-24">
      {posts.map((post)=>(
        <div className=" w-full max-w-sm" key={post.id}>
              <div className="bg-indigo-400 p-5 rounded-lg shadow-lg">
                {/* Title */}
                <h1 className="text-xl font-bold text-white">{post.title}</h1>
      
                {/* Created At Section */}
                <div className="flex justify-between items-center mt-2 text-white">
                  <span className="text-sm">{post.createdAt.slice(0,10)}</span>
                  <FaThumbtack className="text-lg" />
                </div>
      
                {/* Content */}
                <div className="mt-4 text-white text-sm bg-indigo-500 p-3 rounded-md">
                  {post.description}
                </div>
      
                {/* Hashtag and Actions */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-white text-sm">#{post.tags[0]}{" "}#{post.tags[1]}</p>
                  <div className="flex gap-2 text-white">

                    <FaPen className="cursor-pointer hover:text-blue-200" />
                    <MdDelete className="cursor-pointer hover:text-red-300" onClick={()=>handleDeleteNotes(post.id

                    )} />
                  </div>
                </div>
              </div>
        </div>
      ))}  
  
    </div>
    </>
  )
}

export default Home