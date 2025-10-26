import React from 'react'
// import logo from "../assets/image"
function Logo({ width = '100px' }) {
  return (
    <div>
      <img src="/logoreview.png" alt="Logo" style={{ width }}  className='absolute top-2 left-19 -mt-1'/>
    </div>
  )
}

export default Logo
