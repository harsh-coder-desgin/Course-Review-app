import React ,{useEffect}from 'react'
import { Link, NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { Container } from '../index'
import { Logo } from '../index'
import { CreatorLogoutbtn } from "../index"
import { useSelector } from 'react-redux'

function Header() {
  const navigate = useNavigate()

  const users = useSelector(state => state.creatorAuth.users)

  const navItems = [
    {
      name: 'Dashboard',
      slug: "/creator",
      active: true,
      img:"/dashbordlogo.png",
      id:"my-element",
      img2:"my-active",
      end: true
    },
    {
      name: "Create New Course" ,
      slug: "/creator/addcourse",
      active: true,
      img:"/createcourse.png",
      id:"my-element2",
      img2:"my-active2"

    },
    {
      name: 'My course',
      slug: "/creator/mycourse",
      active: true,
      img:"/allcourselogo.png",
      id:"my-element3",
      img2:"my-active3"


    },
    {
      name: 'Setting',
      slug: "/creator/setting",
      active: true,
      img:"/setting.png",
       id:"my-element4",
      img2:"my-active4"
    },
    {
      name: 'Sign Out',
      slug: "/creator/newreviews",
      active: true,
      img:"/signout.png",
      id:"my-element5",
      img2:"my-active5"
    }
  ]
  return (
    <header className="h-screen  w-64 relative">
      {/* <Container> */}
    <nav className=''>
      <div className='border-b-2 border-gray-200'>
        <Link to="/">
              <img src="/logoreview.png" alt="Logo"  className='w-18 h-17 mb-1 mt-1'/>
          {/* <Logo width="60px" className=""/> */}
        </Link>
      </div>
      <ul className='mt-2 font-meduim flex flex-col'>
         {navItems.map((item)=>(
          <NavLink to={item.slug} key={item.name}   end={item.end || false} className={({ isActive }) =>
          isActive
          ? `${item.img2} bg-[#499FD6] font-semibold text-white  py-2 px-13 pt-2`
          : `${item.id} py-2 px-13 pt-2 hover:bg-[#499FD6] hover:font-semibold hover:text-white`
        }
        // className={`${item.id}`}
        // id={`${item.id}`}
       
      >
        {item.name}
          {/* <li className={`${item.id} bg py-2 px-13 pt-2 hover:bg-[#499FD6] hover:font-semibold hover:text-white`}>{item.name}</li> */}
          </NavLink>
      ))}
      </ul>
    </nav>
      {/* </Container> */}
    </header>

  )
}

export default Header
