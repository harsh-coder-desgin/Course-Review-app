import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/creatorAuthSlice'
import authcreator from "../../auth/authcreator"
function Logoutbtn() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authcreator.logout()
      .then(() => { dispatch(logout()) })
      .catch((error) => { console.log("❌ Error User Logout:", error) })
      navigate("/")
  }
  return (
    <button onClick={logoutHandler} className='px-4 py-2 rounded-full bg-black text-white'>
      Logout
    </button>
  )
}

export default Logoutbtn
