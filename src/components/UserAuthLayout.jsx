import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation, data } from 'react-router-dom'
import { userLogin } from '../store/userAuthSlice'
import authuser from "../auth/authuser"

export default function UserAuthLayout({ children }) {
    const [loading, SetLoading] = useState(true)
    const users = useSelector(state => state.userAuth.users)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        authuser.getuser()
            .then((data) => {
                if (users === null) {
                    dispatch(userLogin(data.data))
                }
                if (
                    location.pathname === "/login" ||
                    location.pathname === "/signup" ||
                    location.pathname === "/verfiyemail"
                ) {
                    navigate("/");
                }
            })
            .catch(async (err) => {
                console.log(err);
                if (err.response?.status === 401) {
                    try {
                        const newAccessToken = await authuser.refreshtoken();
                        if (newAccessToken) {
                            await authuser.getuser();
                        }
                    } catch { null }
                }
            })
            .finally(()=>{
                SetLoading(false)
            });
    }, [])

    if (loading) return null

    return children;
}

