import Input from './Input'
import { Link } from "react-router-dom"
function CreatorHeading({heading}) {
  return (
    <div className='flex justify-between mt-1'>
      <div className='ml-20 mt-4'>
        <p className='text-lg'>Welcome  " username "</p>
      <h1 className='text-2xl font-semibold'>{heading}</h1>
      </div>
    
      <div className='flex ml-15 mt-5 mr-6'>
      <Input
      placeholder="Search"
      className=" bg-[#EFEFEF] px-5 py-2 w-80 placeholder:font-light mr-2"
      />
      <Link to="/creator/setting">
        <img src='/creatorprofile1.png' alt='profile' className='h-10 w-11 bordr object-cover rounded-full '/>
      </Link>
      </div>
  
    </div>
  )
}

export default CreatorHeading
