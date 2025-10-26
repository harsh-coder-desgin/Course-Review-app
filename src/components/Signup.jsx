import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Input, Button, Textarea } from "./index"
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import authcreator from '../auth/authcreator'
import authuser from "../auth/authuser"
import { login as authlogin } from '../store/creatorAuthSlice'
function Signup() {
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [files, setFiles] = useState(null);
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFiles(e.target.files[0], e.target.files);
    console.log(files);

  };
  const create = async (data) => {
    setError("")
    console.log(files);
    console.log(data.email);


    try {
      const res = await authcreator.register(data, files)
      //save to local storge email --- to get verfiy email 
      if (res) {
        localStorage.setItem("email", data.email);
        // const users = await authcreator.getuser()
        // if (users) {
        //     dispatch(authlogin(users.data))
        // }
        navigate('/verfiyemail')
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const usercreate = async (data)=>{
      setError("")
      try {
        const res = await authuser.register(data)
        if (res) {
          localStorage.setItem("useremail", data.email);
          console.log(res);
          navigate('/verfiyemail')
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.message)
      }
  }
  return (
      <div className="bg-[url('/background.png')] bg-cover bg-center w-full h-252 mt-4">
         {/* your content */}
         <div className="bg-blue-100 w-1/2 opacity-90 h-full text-center">
           <div className="relative top-20 space-y-7">
             <h1 className="text-center text-3xl text-blue-500 font-semibold -mt-4 mr-67">Sign Up</h1>
             <h1 className="text-black -mt-4 mr-41">Create Account ! Fill the detail</h1>
             <Input
               className="w-1/2 py-4 bg-gray-200 border-b-3 border-gray-400 pl-4"
               placeholder="123@gmail.com"
             />
             <Input
               type={showPassword ? "text" : "password"}
               className="w-1/2 py-4 bg-gray-200 pl-4 border-b-3 border-gray-400"
               placeholder="Password"
             />
             <button
               type="button"
               onClick={() => setShowPassword((prev) => !prev)}
               className="absolute right-49 -mt-17 mr-3"
             >
               {showPassword ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12s3.75 7.5 9.75 7.5a9.72 9.72 0 004.65-1.223M6.228 6.228A9.72 9.72 0 0111.25 4.5c6 0 9.75 7.5 9.75 7.5a10.45 10.45 0 01-2.221 3.772M6.228 6.228L3 3m3.228 3.228L3 3m0 0l18 18" />
                 </svg>
               )}
             </button>
             <label className='bg-red-20 mr-56'>Upload Profile image:</label>
             <Input
             type="file"
             className="w-1/3 py-2 mr-31 mt-2 bg-gray-200 border-2 border-gray-400 pl-4"
             />
             <Input
               className="w-1/2 py-4 bg-gray-200 border-b-3 border-gray-400 pl-4"
               placeholder="Your Creator name"
             />
             <p className='bg-red-20 text-sm mr-10'>Already have an account? but Email verfity is pending</p>
             <p className='-mt-7 mr-77 text-sm font-bold'><a href="/" className='underline'>Click here</a></p>

             <Textarea
             placeholder="Enter your Bio"
             rows={8}
             className="w-1/2 py-4 bg-gray-200 border-b-3 border-gray-400 pl-4"
             />

             <Button
               bgColor="bg-blue-900"
               className="w-1/2 py-3 text-xl font-meduim hover:rounded-full hover:opacity-80"
             >
               Create Account
             </Button>
             <p className="-mt-5">Already have an account? <a href="/creatorlogin" className=" hover:text-gray-600 underline">Sign in</a></p>
           </div>
         </div>
       </div>
  );
}

export default Signup
