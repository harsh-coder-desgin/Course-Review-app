import React, { useEffect, useState } from 'react'
import CreatorHeading from '../components/CreatorHeading'
import CreateCourseHeader from '../components/Header/CreateCourseHeader'
import { Button } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import BasicInformation from '../components/CreateCourseatab/BasicInformation'
import AdvanceInformation from '../components/CreateCourseatab/AdvanceInformation'
import PriceingCourse from '../components/CreateCourseatab/PriceingCourse'
import PublishCourse from '../components/CreateCourseatab/PublishCourse'
import { addcoursedata, changetab } from '../store/addCourseSlice'

function AddCourse() {
  const [tabsCompleted, setTabsCompleted] = useState({
    "basic": false,
    "advanced": false,
    "pricing": false,
    "publish": false,
  });
  const swicthtab = useSelector(state => state.addcourseAuth.tab)
  const coursedata = useSelector(state => state.addcourseAuth.coursedata)
  let localcoursedara = localStorage.getItem("courseData")
  const dispatch = useDispatch()
  
  console.log(coursedata);

  const handleComplete = (tabName) => {
    dispatch(changetab(tabName)) 
    setTabsCompleted((prev) => ({ ...!prev, [tabName]: true, }));
  };
    let swidtchdata = localStorage.getItem("tabname")

  useEffect(() => {
    console.log(swicthtab);
    console.log(swidtchdata);
    // if (!swidtchdata) {
    //    handleComplete("basic"); 
    // }
    // if (swidtchdata) {
    //   handleComplete(swidtchdata); 
    // } 

    // let swidtchdata = localStorage.getItem("tabname")
    if (swicthtab != null) {
      console.log(swicthtab);
      handleComplete(swicthtab);
    } else {
      if (!swidtchdata) {
        handleComplete("basic");
      }
      if (swidtchdata) {
        handleComplete(swidtchdata);
      }
    }
    // else if(swidtchdata && swicthtab === null){
    //     handleComplete(swidtchdata)
    //   }

    //api call of image user course image upload
    // after api call upload in local storage
  }, [swicthtab])

  return (
    <div>
      <CreatorHeading heading={"Create New Course"} />
      <div className='bg-gray-100 h-full mt-5 pb-21'>
        {/* <CreateCourseHeader/> */}
        <div className='pt-12 pl-12 bg'>
          <div className='bg-white w-300 h-full'>
            <div className='flex h-15'>
              <Button className={`font-medium  w-full ${tabsCompleted.basic ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("basic")}><img src='/basicinformation.png' className='h-10 w-10 absolute left-85 top-[154px]' />Basic information</Button>
              <Button className={`font-medium  w-full ${tabsCompleted.advanced ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("advanced")}> <img src='/detail.png' className='h-8 w-8 absolute left-159 top-[158px]' />Advance information</Button>
              <Button className={`font-medium  w-full ${tabsCompleted.pricing ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("pricing")}><img src='/price.png' className='h-9 w-8 absolute right-134 top-40' />Priceing  Course</Button>
              <Button className={`font-medium pt-  w-full ${tabsCompleted.publish ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("publish")}><img src='/publish.png' className='h-9 w-9 absolute right-58 top-39' /> Publish  Course</Button>
            </div>
            <div>
              {tabsCompleted.basic && <BasicInformation/>}
              {tabsCompleted.advanced && <AdvanceInformation/>}
              {tabsCompleted.pricing && <PriceingCourse />}
              {tabsCompleted.publish && <PublishCourse />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
