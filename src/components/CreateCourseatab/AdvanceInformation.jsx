import React, { useEffect, useState  } from 'react'
import Input from '../Input'
import Button from '../Button'
import Textarea from '../Textarea'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { addcoursedata, changetab } from '../../store/addCourseSlice'
function AdvanceInformation({ course }) {
  const dispatch = useDispatch()
  const swicthtab = useSelector(state => state.addcourseAuth.tab)
console.log(swicthtab);

  const [previewImage, setPreviewImage] = useState(course?.courseimage || null);
  const [whatlearn, SetWhatlearn] = useState([
    { title: "", lessons: Array(5).fill("") },
  ]);
  const [error, SetError] = useState('')
  let coursedata = localStorage.getItem("courseData")
  // console.log(coursedata);
  
 const obj = JSON.parse(coursedata);
 console.log(obj);
 


useEffect(()=>{
 if (obj?.description) {
  
  let coursedataArr = JSON.parse(obj?.whatlearn)       // now it's an array of objects
  
  // console.log(Array.isArray(coursedataArr));  // true
  // console.log(coursedataArr);
  if (Array.isArray(coursedataArr) === true) {
    SetWhatlearn(coursedataArr)
  }
  
}
//api call  for image or local storage get image

// use setPreviewImage('api call res')
},[])
//  const arr = (obj.whatlearn)
//  console.log(arr);
 console.log(obj?.description);
 
 
  //[{"t":"dsa","l":[]}]
  // const [chaptertotal, SetChaptertotal] = useState(Array(2).fill(""));
  //[{["learn html"] :["dasda","Sdad","sadsa"]}]
  const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
    defaultValues: {
      description: course?.description || obj?.description && obj?.description.replace(/^"|"$/g, "") ||'',
      // courseimage: course?.courseimage || obj?.courseimage.replace(/^"|"$/g, "") ||'',

    }
  })

  // if (coursedata) {
    // console.log(obj.whatlearn);
    // SetWhatlearn(obj.whatlearn)
    
  // }
  localStorage.setItem("tabname", "advanced")
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const submit = (data, e) => {
    console.log("d");

    e.preventDefault();
    if (course) {
      //update
    } else {
      console.log(whatlearn);
      console.log(data,data.courseimage[0]);
      dispatch(addcoursedata({description:data.description,whatlearn}))
      const existingData = JSON.parse(localStorage.getItem("courseData"))
      existingData.description= (JSON.stringify(data.description));
      existingData.whatlearn = (JSON.stringify(whatlearn));
      localStorage.setItem("courseData", JSON.stringify(existingData));
      dispatch(changetab("pricing"))
      localStorage.removeItem("tabname");
      // localStorage.setItem("coursedata",{...data.description,whatlearn})
      // whatlearn
      // dispatch(addcoursedata({0:"dd",1:23}))
            // console.log(data)
      // dispatch(changetab("pricing"))
      // localStorage.removeItem("tabname");
 
      //add
    }
  }
 
  const handleTitleChange = (index, event) => {
    const newTopics = [...whatlearn];
    newTopics[index].title = event.target.value;
    SetWhatlearn(newTopics);
    console.log(newTopics);
    SetError('')

  };

  const handleLessonChange = (topicIndex, lessonIndex, event) => {
    const newTopics = [...whatlearn];
    newTopics[topicIndex].lessons[lessonIndex] = event.target.value;
    SetWhatlearn(newTopics);
    console.log(newTopics);
    SetError('')
  };
  // const addtopic = (topicIndex) => {
  //   // const newTopics = [...whatlearn];
  //   // newTopics[topicIndex].lessons.push('')
  // }
  return (
    <div>
      <div className='border-b-1 border-gray-300'>
        <h1 className='font-bold ml-10 mt-8 mb-6 text-[21px]'>Advance information</h1>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className='border-b-1 border-gray-300 pb-6'>
          <div className='w-15/16 ml-10 mt-5 space-y-4'>
            <label className='text-lg'>Course Thumnail</label>
            <div className='flex mt-5'>
              {!previewImage ? <img src='/imgaelogo.png' alt='image' className='h-40 w-55' /> : <img src={previewImage} alt='image' className='w-72 h-48 object-fill' />}
              <div className='ml-9 w-90'>
                <p className='text-gray-500'>Upload your course thumbnail here. <a className='font-semibold text-black'>Important guidelines:</a> 1200 × 800 pixels or 12:8 ratio. Supported formats:<a className='font-semibold text-black'>.jpg, .png, or .jpeg.</a> </p>
                <input type="file" id="file-upload"  accept="image/*"
                  // onChange={handleFileChange} 
                  {...register("courseimage", {
                    required: "Course Image is required",
                    onChange: handleFileChange
                  })}
                  className='hidden' />
                <label htmlFor="file-upload" className='px-4 py-2 bg-[#A9DBFB] font-semibold mt-6 text-blue-800 flex w-45 cursor-pointer '>Upload Image <img src='/uploadimage.png' className='h-6 w-6 ml-3' /></label>
                {/* <div className='flex flex-row'> */}
                {/* <Input type="file"  id="file-upload"  className='hidden px-4 py-2 bg-[#A9DBFB] font-semibold mt-6 text- text-blue-800 flex cursor-pointer ' />  */}
                {/* <img src='/uploadimage.png' className='h-6 w-6 mt-8' /> */}
                {/* </div> */}
              </div>
            </div>
            <p className='text-red-500 font-semibold text-sm mt-2 ml-2'>{errors?.courseimage?.message}</p>
          </div>
        </div>

        <div className='border-b-1 border-gray-300 pb-6'>
          <div className='w-15/16 ml-10 mt-5 space-y-4'>
            <label className='text-lg'>Course Description</label>
            <Textarea err={errors?.description?.message}
              {...register("description", {
                required: "Enter your Description",
                maxLength: {
                  value: 4000,        // maximum number of characters
                  message: "Description must be at least 4000 characters long",
                },
                minLength: { value: 100, message: "Description cannot less than 100 characters", }
              })}
              className={`border  border-gray-300 w-full mt-4 px-4 py-2 placeholder:text-[15px] ${errors.description ? "border-pink-500 text-pink-600" : "border-gray-300"}`} rows={10} placeholder="Enter your descrption " />
          </div>
        </div>

        <div className='border-b-1 border-gray-300 pb-6'>
          <div className='w-15/16 ml-10 mt-5 space-y-4'>
            <div className='flex justify-between'>
              <label className='text-lg'>What you will teach in this course</label>

              <Button textColor='text-[#2C91D2]' bgColor=''
                type='button'
                onClick={() => {
                  const newTopics = [...whatlearn];
                  console.log(newTopics.length);
                  if (newTopics.length >= 20) {
                    SetError("Maximum 20 topics allowed")
                  } else {
                    let add = { title: "", lessons: Array(5).fill("") }
                    newTopics.push(add)
                    SetError('')
                  }
                  SetWhatlearn(newTopics)
                }}
                className='cursor-pointer'>+Add tag</Button>
            </div>
            {error && <p className='text-red-500 text-center font-semibold text-lg mt-2 ml-2'>{error}</p>}

            {whatlearn.map((topic, topicIndex) => (
              <div key={topicIndex}>
                {topicIndex != 0 && <div className='flex justify-end'>
                  <Button textColor='text-[#2C91D2]' bgColor=''
                    type='button'
                    onClick={() => {
                      const newTopics = [...whatlearn];
                      console.log(newTopics.length);
                      if (newTopics.length >= 20) {
                        SetError("Maximum 20 topics allowed")
                      } else {
                        let add = { title: "", lessons: Array(5).fill("") }
                        newTopics.push(add)
                        SetError('')
                      }
                      SetWhatlearn(newTopics)
                    }}
                    className='cursor-pointer'>+Add tag</Button>
                </div>}
                <div key={topicIndex}>
                  {topicIndex != 0 && <Button className='absolute right-270' bgColor='' type="button" textColor='text-red-400'
                    onClick={() => {
                      const newTopics = [...whatlearn];
                      newTopics.splice(topicIndex, 1)
                      SetWhatlearn(newTopics)
                      SetError('')
                    }}

                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="18"      // adjust size as needed
                    height="24"
                    fill="#ff0000"  // red color
                  >
                      <path d="M512 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h448c17.7 0 32 14.3 32 32z" />
                    </svg>
                  </Button>}
                  <Input label={`Chapter ${topicIndex + 1}`} value={topic.title} onChange={(e) => handleTitleChange(topicIndex, e)}
                   className="flex flex-col border border-gray-300 w-full mt-2 p-2 pl-4 placeholder:text-sm"  placeholder="What is the heading of this chapter.." required/>
                   <div className='flex justify-end -mb-2'>
                    <Button
                      textColor='text-[#2C91D2]' bgColor=''
                      type='button'
                      onClick={() => {
                        const newTopics = [...whatlearn];
                        let totallenght = newTopics[topicIndex].lessons.length
                        if (totallenght >= 20) {
                          SetError("Maximum 20 lessons per topic")
                        } else {
                          SetError('')
                          newTopics[topicIndex].lessons.push('')
                        }
                        console.log(totallenght);

                        SetWhatlearn(newTopics)
                      }} className='cursor-pointer'>+Add tag Point</Button>
                  </div>
                </div>


                {topic.lessons.map((lesson, lessonIndex) => (

                  <div key={lessonIndex} className='flex'>
                    {lessonIndex != 0 && <Button className='absolute right-282' bgColor='' type="button" textColor='text-red-400'
                      onClick={() => {
                        const newTopics = [...whatlearn];
                        newTopics[topicIndex].lessons.splice(lessonIndex, 1)
                        SetWhatlearn(newTopics)
                        SetError('')
                      }}

                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="18"      // adjust size as needed
                      height="24"
                      fill="#ff0000"  // red color
                    >
                        <path d="M512 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h448c17.7 0 32 14.3 32 32z" />
                      </svg>
                    </Button>}
                    <Input label={`${lessonIndex < 9 ? "0" : ""}${lessonIndex + 1}`} value={lesson} onChange={(e) => handleLessonChange(topicIndex, lessonIndex, e)} className="flex flex-col border border-gray-300 w-full mt-2 p-2 pl-4 placeholder:text-sm" placeholder="What you will teach in this course.." required />

                  </div>

                ))}

              </div>
            ))}
            {/* [{chapter1:"dsa","das","dsa","dss","dwdd","dsa","dad","sad","ddd"}] */}



            <div className='flex justify-between mt-10 pb-12'>
              <Button bgColor='' textColor='' type="button" 
              onClick={()=>dispatch(changetab("basic"))}
               className='border-2 border-gray-300 px-4 py-2 mr-2 cursor-pointer text-gray-400 hover:bg-gray-50'>Prevous</Button>
              <Button  bgColor={course ? 'bg-white' : 'bg-[#499FD6]'} textColor={course ? 'text-green-500' : 'text-white'} type="submit" className={`px-4 py-2 mr-2 cursor-pointer ${course ? 'border-2 border-green-500 px-7 hover:bg-gray-50' : 'border hover:text-[#499FD6] hover:bg-white'}`}>{course ? "Update" : "Save & Next"}</Button>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default AdvanceInformation
