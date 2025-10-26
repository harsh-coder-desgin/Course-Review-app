import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Input } from '../index'
import { Logo } from '../index'
import { UserLogoutbtn } from "../index"
import authuser from "../../auth/authuser"
import { usersearchcourse } from "../../store/usersearch"

function CreateCourseHeader() {

  const navigate = useNavigate()

  const navItems = [
    { name: "Basic", slug: "/", active: true },
    { name: "Advacne", slug: "/", active: true },
    { name: "price", slug: "/", active: true },
    { name: "Submit", slug: "/", active: true },
  ];

  return (
    <>
<header className="py-4 bg-white text-black border-b border-[#DEDEDE] sticky top-0 z-50">
  <Container>
    <nav className="flex items-center">
 

      {/* Right: Nav Links + Login */}
      <ul className="flex items-center ml-auto space-x-9">
        {navItems.map((item) => 
          item.active ? (
            <li key={item.name}>
              <Button
              bgColor=''
              textColor=''
                onClick={() => navigate(item.slug)
                }
                className="text-gray-500 font-semibold hover:text-blue-400"
              >
                {item.name} 
              </Button>
            </li>
          ) : null
        )}
      </ul>
    </nav>
  </Container>
</header>

    </>
  );
}

export default CreateCourseHeader
