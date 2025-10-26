import React from 'react'
import Input from '../Input'
import Button from '../Button'
import { useForm } from "react-hook-form"
import Select from '../Select'
import { useSelector, useDispatch } from 'react-redux'
import { addcoursedata, changetab } from '../../store/addCourseSlice'

function BasicInformation({ course }) {
  const coursebasicdata = useSelector(state => state.addcourseAuth.coursedata)
  const swicthtab = useSelector(state => state.addcourseAuth.tab)
  console.log(swicthtab);

  const dispatch = useDispatch()
  console.log(coursebasicdata, "Hwllo djdkwjhdjfkrg");
  let coursedata = localStorage.getItem("courseData")
  let finalcoursedata = JSON.parse(coursedata);
  console.log(finalcoursedata);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: course?.title || finalcoursedata?.title && finalcoursedata?.title.replace(/^"|"$/g, "") || '',
      subtitle: course?.subtitle || finalcoursedata?.subtitle  && finalcoursedata?.subtitle.replace(/^"|"$/g, "")|| '',
      coursecategory: course?.coursecategory || finalcoursedata?.coursecategory  &&  finalcoursedata?.coursecategory.replace(/^"|"$/g, "")|| 'Programming Languages',
      coursetopic: course?.coursetopic || finalcoursedata?.coursetopic && finalcoursedata?.coursetopic.replace(/^"|"$/g, "") || '',
      courselanguage: course?.courselanguage || finalcoursedata?.courselanguage && finalcoursedata?.courselanguage.replace(/^"|"$/g, "") || 'Hindi',
      courselevel: course?.courselevel || finalcoursedata?.courselevel && finalcoursedata?.courselevel.replace(/^"|"$/g, "") || 'Beginner',
      courseduration: course?.courseduration || finalcoursedata?.courseduration && finalcoursedata?.courseduration.replace(/^"|"$/g, "") || '1–5 hours',
    }
  })
  localStorage.setItem("tabname", "basic")
  const submit = (data) => {
    if (course) {
      //update
    } else {
      // if (swicthtab === "advanced") {
      // console.log);
      // console.log("in swirjdsji");

      // }
      dispatch(addcoursedata(data))
      // console.log(data)

      localStorage.removeItem("tabname");
      
      const existingData = JSON.parse(localStorage.getItem("courseData"))
      if (!existingData) {
        const dataWithTimestamp = { ...data, timestamp: Date.now() };
          localStorage.setItem("courseData", JSON.stringify(dataWithTimestamp));
      } else {
        existingData.title = (JSON.stringify(data.title));
        existingData.subtitle = (JSON.stringify(data.subtitle));
        existingData.coursecategory = (JSON.stringify(data.coursecategory));
        existingData.coursetopic = (JSON.stringify(data.coursetopic));
        existingData.courselanguage = (JSON.stringify(data.courselanguage));
        existingData.courselevel = (JSON.stringify(data.courselevel));
        existingData.courseduration = (JSON.stringify(data.courseduration));
        localStorage.setItem("courseData", JSON.stringify(existingData));
      }


      console.log(swicthtab);
      // dispatch(changetab("basic"))

      dispatch(changetab("advanced"))
      // localStorage.setItem("tabname", "advanced")

      //add
    }
  }
  return (
    <div className=''>
      <div className='border-b-1 border-gray-300'>
        <h1 className='font-bold ml-10 mt-8 mb-6 text-[21px]'>Basic information</h1>
      </div>
      <form onSubmit={handleSubmit(submit)} className='w-15/16 ml-10 mt-5 space-y-10'>
        <Input label="Title" err={errors?.title?.message}  {...register("title", {
          required: "Enter your Title",
          maxLength: {
            value: 50,
            message: "Title cannot exceed 50 characters",
          },
          minLength: { value: 3, message: "Title cannot less than 3 characters", }
        })}
          className={`flex flex-col border border-gray-300 w-full mt-2 p-2 pl-4 placeholder:text-sm invalid:border-pink-500  ${errors.title ? "border-pink-500 text-pink-600" : "border-gray-300"}`} placeholder="Your Course title" />

        <Input label="SubTitle" err={errors?.subtitle?.message}
          {...register("subtitle", {
            required: "Enter your SubTitle",
            maxLength: {
              value: 50,
              message: "SubTitle cannot exceed 50 characters",
            }, minLength: { value: 3, message: "Title cannot less than 3 characters", }

          })}
          className={`flex flex-col border border-gray-300 w-full mt-2 p-2 pl-4 placeholder:text-sm  ${errors.subtitle ? "border-pink-500 text-pink-600" : "border-gray-300"}`} placeholder="Your Course Subtitle" />

        <label>Course Category</label>
        {errors.courselanguage && (
          <p className="text-red-500 mt-1">{errors.courselanguage.message}</p>
        )}

        <Select
          {...register("coursecategory", {
            required: "Please Select Course Category",
          })}
          err={errors?.coursecategory?.message}
          options={[
            "Programming Languages",
            "Web Development",
            "Mobile App Development",
            "Frontend Development",
            "Backend Development",
            "Full-Stack Development",
            "Game Development",
            "Data Structures & Algorithms",
            "DevOps & Deployment",
            "AI & Machine Learning",
            "Cybersecurity",
            "Database & SQL"
          ]}
          className={`block w-120 px-3 py-3 mt-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm ${errors.coursecategory ? "border-pink-500" : "border-gray-300"}`}
        />

        <Input label="Course Topic" err={errors?.coursetopic?.message} {...register("coursetopic", {
          required: "Enter your Course Topic",
          maxLength: {
            value: 100,
            message: "Course Topic cannot exceed 100 characters",
          }, minLength: { value: 20, message: "Title cannot less than 20 characters", }
        })}
          className={`flex flex-col border border-gray-300 w-full mt-2 p-2 pl-4 placeholder:text-sm ${errors.coursetopic ? "border-pink-500 text-pink-600" : "border-gray-300"}`} placeholder="What is primarily taught in this course?"
        />
        <div className='flex space-x-3'>
          <div>
            <label>Course language</label>
            <Select {...register("courselanguage", {
              required: true,
            })}
              className="block w-90 px-3 py-3 mt-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
              options={[
                "Hindi",
                "English",
              ]}
            />
          </div>

          <div>
            <label>Course level</label>
            <Select {...register("courselevel", {
              required: true,
            })}
              className="block w-92 px-3 py-3 mt-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
              options={[
                "Beginner",
                "Intermediate",
                "Advanced",
                "All Levels"
              ]}
            />
          </div>

          <div>
            <label>Course duration</label>
            <Select {...register("courseduration", {
              required: true,
            })}
              className="block w-93 px-3 py-3 mt-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm"
              options={[
                "1–5 hours",
                "5–10 hours",
                "10–20 hours",
                "20–40 hours",
                "40+ hours"
              ]}
            />
          </div>
        </div>

        <div className='flex mt-10 pb-12 justify-end'>
          <Button type="submit" bgColor={course ? 'bg-white' : 'bg-[#499FD6]'} textColor={course ? 'text-green-500' : 'text-white'} className={`px-4 py-2 mr-2 cursor-pointer ${course ? 'border-2 border-green-500 px-7 hover:bg-gray-50' : 'border hover:text-[#499FD6] hover:bg-white'}`}>{course ? "Update" : "Save & Next"}</Button>
        </div>
      </form>
    </div>
  )
}

export default BasicInformation
