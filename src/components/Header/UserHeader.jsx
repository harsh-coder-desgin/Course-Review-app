import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Input } from '../index'
import { Logo } from '../index'
import { UserLogoutbtn } from "../index"
import authuser from "../../auth/authuser"
import { usersearchcourse } from "../../store/usersearch"

function UserHeader() {

  const navigate = useNavigate()

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All creators", slug: "/", active: true },
    { name: "Course", slug: "/", active: true },
    { name: "Join as Creator", slug: "/creatorlogin", active: true },
  ];

  return (
    <>
<header className="py-4 bg-white text-black border-b border-[#DEDEDE] sticky top-0 z-50">
  <Container>
    <nav className="flex items-center">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-3 mt-1">
        <Link to="/">
          <Logo width="65px" />
        </Link>
        <Input
          className="border rounded-2xl w-90 h-9 pl-5 placeholder:font-medium"
          placeholder="Search for course"
        />
      </div>

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
        <li>
          <Button 
          bgColor=''
          textColor=''
          className="text-gray-500 font-semibold  border text-white bg-[#172B6F] rounded-full px-6 py-2 hover:bg-white hover:text-[#172B6F]">
            Login
          </Button>
        </li>
      </ul>
    </nav>
  </Container>
</header>

    </>
  );
}

export default UserHeader
