import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authcreator from '../auth/authcreator'
import authuser from "../auth/authuser"
export default function VerfiyAuth({children}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const checkauth = async () => {
            try {
                const data = await authcreator.verifyauth()

                if (data) {
                    navigate("/creator");
                    return;
                }

            } catch (error) {
                // const res = await authuser.getuser()
                // if (res) {
                //     navigate("/")
                //     return
                // }
                console.log(error);
                const storedEmail = localStorage.getItem("email");
                const storeduserEmail =localStorage.getItem("useremail");
                console.log(storedEmail,storeduserEmail);
                
                if (!storedEmail && !storeduserEmail) {
                    navigate("/");
                } 
            } finally {
                setLoading(false)
            }

        };
        checkauth();

    }, [navigate]);

    if (loading) return <p>Loading...</p>

    return children;

}

