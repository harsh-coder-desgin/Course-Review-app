import React from 'react'
import { useParams } from 'react-router-dom'
function TestFlie() {
    const {id} = useParams()
    console.log(id);
    
    // console.log(params(id));
    
  return (
    <div>
      <h1>{id} was id of course</h1>
    </div>
  )
}

export default TestFlie
