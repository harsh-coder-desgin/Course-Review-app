import React from 'react'

import Input from '../Input'
import Button from '../Button'
import { useSelector, useDispatch } from 'react-redux'
import {changetab } from '../../store/addCourseSlice'

function PublishCourse() {
    const dispatch = useDispatch()

  localStorage.setItem("tabname", "publish")
  let coursedata = localStorage.getItem("courseData")
  let finalcoursedata = JSON.parse(coursedata);
  console.log(finalcoursedata);

  const finlasubmit =(e) =>{
        e.preventDefault();
// try coursedata send api 
    let remove = finalcoursedata.map((i,v)=>( v.replace(/^"|"$/g, "")))
    console.log(finalcoursedata,remove);
    // dispatch(changetab("basic"))
    
    // localStorage.removeItem("courseData");
    // localStorage.removeItem("tabname");


    //image already upload
  }
  return (
    <div>
      <div className='border-b-1 border-gray-300'>
        <h1 className='font-bold ml-10 mt-8 mb-6 text-[21px]'>Publish Course</h1>
      </div>
      <form onSubmit={finlasubmit}>
        <div className='border-b-1 border-gray-300 pt-3 pb-13'>
        <div className='w-15/16 ml-10 mt-5 space-y-7'>
          <label className='text-lg'>Title</label>
          <Input className="flex flex-col mt-4  border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.title && finalcoursedata?.title.replace(/^"|"$/g, "") || 'No data yet'} />
          <label className='text-lg'>Category</label>
          <Input className="flex flex-col mt-5 border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.coursecategory  && finalcoursedata?.coursecategory.replace(/^"|"$/g, "")|| 'No data yet'} />

        </div>
      </div>

      <div className='border-b-1 border-gray-300 pb-6'>
        <div className='w-15/16 ml-10 mt-5 space-y-4'>
          <label className='text-lg'>Course Thumnail</label>
          <div className='flex mt-5'>
            <img 
            src='/imgaelogo.png'
            // src={finalcoursedata?.courseimage} || src='/imgaelogo.png'
            alt='image' className='h-40 w-55' />
          </div>
        </div>
      </div>
      <div className='border-b-1 border-gray-300 pt-3 pb-13'>
        <div className='w-15/16 ml-10 mt-5 space-y-4'>
          <label className='text-lg'>Course Type</label>
          <Input className="flex flex-col mt-4  border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.coursetype && finalcoursedata?.coursetype.replace(/^"|"$/g, "")|| 'No data yet'} />
          <div className='flex mt-10'>
            <div>
              <label>Price</label>
              <Input className="flex flex-col mt-4  border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.price && finalcoursedata?.price.replace(/^"|"$/g, "") || 'No data yet'} />
            </div>
            <div className='ml-13'>
              <label>Discount</label>
              <Input className="flex flex-col mt-4  border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.discount && finalcoursedata?.discount.replace(/^"|"$/g, "")|| 'No data yet'}/>
            </div>
          </div>
          <div className='flex justify-between mt-10 pb-12'>
            <Button bgColor='' textColor='' type="button"  onClick={()=>dispatch(changetab("pricing"))} 
               className='border-2 border-gray-300 px-4 py-2 mr-2 cursor-pointer text-gray-400 hover:bg-gray-50'>Prevous</Button>
            <Button bgColor='bg-[#499FD6]' textColor='text-white'  type="submit" className=' px-4 py-2 mr-2 cursor-pointer border hover:text-[#499FD6] hover:bg-white'>Submit for review</Button>
          </div>
        </div>
      </div>
      </form>
    </div>
  )
}

export default PublishCourse
