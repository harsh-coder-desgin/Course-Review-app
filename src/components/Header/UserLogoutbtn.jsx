import React from 'react'
import authuser from "../../auth/authuser"
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/userAuthSlice';
function UserLogoutbtn() {
  const dispatch = useDispatch()
  const logout = async() => {
    const data = await authuser.logout()
    if (data) {
      dispatch(userLogout())
    }
  }
  return (
    <button onClick={logout} className='px-4 py-2 rounded-full bg-black text-white'>
      Logout
    </button>
  )
}

export default UserLogoutbtn
