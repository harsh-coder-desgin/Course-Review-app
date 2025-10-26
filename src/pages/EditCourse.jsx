import React, { useEffect, useState } from 'react'
import CreatorHeading from '../components/CreatorHeading'
import { Button } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import BasicInformation from '../components/CreateCourseatab/BasicInformation'
import AdvanceInformation from '../components/CreateCourseatab/AdvanceInformation'
import PriceingCourse from '../components/CreateCourseatab/PriceingCourse'
import PublishCourse from '../components/CreateCourseatab/PublishCourse'
import { changetab } from '../store/addCourseSlice'
function EditCourse() {
      const [tabsCompleted, setTabsCompleted] = useState({
    "basic": false,
    "advanced": false,
    "pricing": false,
    "publish": false,
  });
     const [course,SetCourse]=useState([
          {id:1,img:"/backendtest.png",des:"At W3Schools you will find complete references about HTML elements, attributes, events, color names,..",title:"Complete Python Programming lanuage ",name:"Chai aur code",star:"⭐⭐⭐⭐⭐ 1.2k",p:"100rs",d:"150"},
          {id:2,img:"/backendtest.png",des:"At W3Schools you will find complete references about HTML elements, attributes, events, color names,..",title:"Complete Python Programming lanuage ",name:"Chai aur code",star:"⭐⭐⭐⭐⭐ 1.2k",p:"100rs",d:"150"},
          {id:3,img:"/backendtest.png",des:"At W3Schools you will find complete references about HTML elements, attributes, events, color names,..",title:"Complete Python Programming lanuage ",name:"Chai aur code",star:"⭐⭐⭐⭐⭐ 1.2k",p:"100rs",d:"150"},
                  {id:4,img:"/backendtest.png",des:"At W3Schools you will find complete references about HTML elements, attributes, events, color names,..",title:"Complete Python Programming lanuage ",name:"Chai aur code",star:"⭐⭐⭐⭐⭐ 1.2k",p:"100rs",d:"150"},
      ])
  const swicthtab = useSelector(state => state.addcourseAuth.tab)
  const dispatch = useDispatch()
  
  const handleComplete = (tabName) => {
    dispatch(changetab(tabName)) 
    setTabsCompleted((prev) => ({ ...!prev, [tabName]: true, }));
  };
    let swidtchdata = localStorage.getItem("tabname")

  useEffect(() => {
    if (swicthtab != null) {
      handleComplete(swicthtab);
    } else {
      if (!swidtchdata) {
        handleComplete("basic");
      }
      if (swidtchdata) {
        handleComplete(swidtchdata);
      }
    }
  }, [swicthtab])
return (
    <div>
      <CreatorHeading heading={"Create New Course"} />
      <div className='bg-gray-100 h-full mt-5 pb-21'>
        <div className='pt-12 pl-12 bg'>
          <div className='bg-white w-300 h-full'>
            <div className='flex h-15'>
              <Button className={`font-medium  w-full ${tabsCompleted.basic ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("basic")}><img src='/basicinformation.png' className='h-10 w-10 absolute left-85 top-[154px]' />Basic information</Button>
              <Button className={`font-medium  w-full ${tabsCompleted.advanced ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("advanced")}> <img src='/detail.png' className='h-8 w-8 absolute left-159 top-[158px]' />Advance information</Button>
              <Button className={`font-medium  w-full ${tabsCompleted.pricing ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("pricing")}><img src='/price.png' className='h-9 w-8 absolute right-134 top-40' />Priceing  Course</Button>
            </div>
            <div>
              {tabsCompleted.basic && <BasicInformation course={course}/>}
              {tabsCompleted.advanced && <AdvanceInformation course={course}/>}
              {tabsCompleted.pricing && <PriceingCourse course={course}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCourse
