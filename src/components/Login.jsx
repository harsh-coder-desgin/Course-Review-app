import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Input, Button, Container } from "./index"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import authcreator from '../auth/authcreator'
import authuser from "../auth/authuser"
import { login as authlogin } from '../store/creatorAuthSlice'
import { userLogin as loginuser } from '../store/userAuthSlice'

function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("")

  

  const login = async (data) => {
    setError("")
    try {
      const session = await authcreator.login(data)
      if (session) {
        const users = await authcreator.getuser()
        if (users) {
          dispatch(authlogin(users.data))
        }
        navigate('/creator')
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <div className="bg-[url('/background.png')] bg-cover bg-center w-full h-screen mt-4">
      {/* your content */}
      <div className="bg-blue-100 w-1/2 opacity-90 h-full text-center">
        <form onSubmit={handleSubmit(login)} className="relative top-45 space-y-10">
          <h1 className="text-center text-black text-3xl text-blue-500 font-semibold -mt-4 mr-75">Login</h1>
          <h1 className="text-black -mt-4 mr-27">Welcome back! Log in to your account</h1>
            {error && (
            <p className="text-red-500 text-base sm:text-lg text-center mb-4">
              {error}
            </p>
          )}

          <Input
            className="w-1/2 py-4 bg-gray-200 border-b-3 border-gray-400 pl-4"
            placeholder="123@gmail.com"
             {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                    "Invalid email address",
                },
              })}
          />
          <Input
            type={showPassword ? "text" : "password"}
            className="w-1/2 py-4 bg-gray-200 pl-4 border-b-3 border-gray-400"
            placeholder="Password"
             {...register("password", { required: true })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-49 -mt-20 mr-3"
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
          <Button
            bgColor="bg-blue-900"
            className="w-1/2 py-3 text-xl font-meduim hover:rounded-full hover:opacity-80"
          >
            Login
          </Button>
          <p className="-mt-7">Don’t have an account? <a href="/creatorsignup" className=" hover:text-gray-600 underline">Sign up</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
