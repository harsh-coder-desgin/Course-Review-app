import './App.css'
import { Footer } from "./components/index"
import { Outlet } from 'react-router-dom'
import { UserHeader } from './components/index'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from './store/userAuthSlice'
import { login } from './store/creatorAuthSlice'
import authuser from "./auth/authuser"
import authcreator from "./auth/authcreator"

function App() {
  const [loading, SetLoading] = useState(true)
  
  const users = useSelector(state => state.userAuth.users)
  const creator = useSelector(state => state.creatorAuth.users)
  const dispatch = useDispatch();

  useEffect(() => {
    authuser.verfiyauthuser()
      .then((data) => {
        if (users === null) {
          dispatch(userLogin(data.data))
        }
      })
      .catch(async (err) => {
        if (err.response?.status === 401) {
          try {
            const newAccessToken = await authuser.refreshtoken();
            if (newAccessToken) {
              await authuser.getuser();
            }
          } catch { null }
        }
      })
      .finally(() => {
        SetLoading(false)
      });
    if (creator === null) {
      authcreator.verifyauth()
        .then((data) => {
          dispatch(login(data.data))
        })
        .catch((err) => {
          console.log(err);
          null
        })
    }
  }, [])

  return !loading ? (
    <>
      <div className="flex flex-col min-h-screen md:min-h-[124dvh] lg:min-h-[100dvh]">
        <UserHeader />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ) : null
}

export default App
