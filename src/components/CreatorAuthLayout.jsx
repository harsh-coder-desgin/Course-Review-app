import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import authcreator from '../auth/authcreator'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { login as authlogin } from '../store/creatorAuthSlice'
import LoadingSpinner from './LoadingSpinner';
import authcourse from "../auth/authcourse"
import { allcourse } from "../store/courseAuthSlice"
import { useNavigationType } from "react-router-dom";

export default function AuthLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const users = useSelector(state => state.creatorAuth.users)
  console.log(users);

  const dispatch = useDispatch()
  const location = useLocation();
  
console.log(location);

  useEffect(() => {
    authcreator.verifyauth()
      .then((data) => {
        // console.log(data.data);
        //authcourse.allcourse()
        //.then((data)=>{
        //  dispath(course(data))})
        //
        if (users === null) {
          dispatch(authlogin(data.data))
          // console.log("disapth");
        }
        console.log("data");

        // console.log(data);
        if (
          location.pathname === "/creatorlogin" ||
          location.pathname === "/creatorsignup" ||
          location.pathname === "/verfiyemail"
        ) {
          navigate("/creator");
        }
        // navigate("/creator")    
      })
      .catch(async (err) => {
        // console.log("catch");

        if (err.response?.status === 401) {
          // console.log("401");

          try {
            // console.log("newaccewss");

            const newAccessToken = await authcreator.refreshtoken();
            // console.log(newAccessToken);

            if (newAccessToken) {
              // console.log("new token");

              // Token refreshed → retry verifyauth
              await authcreator.verifyauth();
              navigate("/creator")
            } else {
              // console.log("fail");

              // Refresh failed → go to login
              navigate("/creatorlogin");
            }
          } catch {
            // console.log("catch 2c");

            navigate("/creatorlogin");
          }
        }
      })
      .finally(() => {
        setLoading(false)
      });

    // authcourse.allcourses()
    // .then((data)=>{
    //   if (data) {
    //     console.log(data.data.data);      
    //     dispatch(allcourse(data.data.data))
    //   }else{
    //     null
    //   }
    // })
    // .catch((error)=>{
    //   console.log(error);

    // }) 

    // if (  
    //   location.pathname === "/creator"
    // ) {
    // console.log("snbdmaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    //   localStorage.removeItem("courseData");
    //   localStorage.removeItem("tabname");
    // }   
    // if (navigationType === "POP") {
    //   localStorage.removeItem("courseData");
    //   localStorage.removeItem("tabname");
    // } 
    const draft = JSON.parse(localStorage.getItem("courseData"))
    if (draft && Date.now() - draft.timestamp > 7*24*60*60*1000) { // 7 days
      localStorage.removeItem("courseData");
    }
  }, []);

  if (loading) return null

  return children;
}

