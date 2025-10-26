import React from 'react'
import Button from '../Button'
import Input from '../Input'
import Textarea from '../Textarea'
import Select from '../Select'
import { useForm } from "react-hook-form"
import { addcoursedata, changetab } from '../../store/addCourseSlice'
import { useSelector, useDispatch } from 'react-redux'

function PriceingCourse({ course }) {
  const dispatch = useDispatch()
    let coursedata = localStorage.getItem("courseData")
  let finalcoursedata = JSON.parse(coursedata);
console.log(finalcoursedata);
  localStorage.setItem("tabname", "pricing")
  const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
    defaultValues: {
      coursetype: course?.coursetype || finalcoursedata?.coursetype && finalcoursedata?.coursetype.replace(/^"|"$/g, "") || 'Free',
      price: course?.price || finalcoursedata?.price &&  finalcoursedata?.price.replace(/^"|"$/g, "") ||'',
      discount: course?.discount || finalcoursedata?.discount && finalcoursedata?.discount.replace(/^"|"$/g, "") ||'',
    }
  })
  const coursetype = watch("coursetype");

  const submit = (data) => {
    if (course) {
      //edit
    } else {
      //add
      console.log(data);
      dispatch(addcoursedata(data))
      const existingData = JSON.parse(localStorage.getItem("courseData"))
      existingData.coursetype = (JSON.stringify(data.coursetype));
      existingData.price = (JSON.stringify(data.price));
      existingData.discount = (JSON.stringify(data.discount));
      localStorage.setItem("courseData", JSON.stringify(existingData));
      dispatch(changetab("publish"))
      localStorage.removeItem("tabname");
    }
  }
  if (coursetype === "Free") {
    setValue("price",'')
    setValue('discount','')
  }
  return (
    <div>
      <div className='border-b-1 border-gray-300'>
        <h1 className='font-bold ml-10 mt-8 mb-6 text-[21px]'>Priceing Course</h1>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className='border-b-1 border-gray-300 pt-3 pb-13'>
          <div className='w-15/16 ml-10 mt-5 space-y-4'>
            <label className='text-lg'>Course Type</label>
            <Select
              {...register("coursetype", {
              })}
              err={errors?.coursetype?.message}
              options={[
                "Free",
                "Paid",
              ]}
              
              className={`block w-120 px-3 py-3 mt-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm ${errors.coursecategory ? "border-pink-500" : "border-gray-300"}`}
            />
          </div>
        </div>

        <div className='border-b-1 border-gray-300 pb-6 mt-6'>
          <div className='w-15/16 ml-10 mt-5 space-y-7'>
            <label className='text-lg'>Price </label>
            <Input
              {...register("price", {
                required: coursetype === "Free" ? false :"Enter Course Price",
               min: { value: 10, message: "Course Price cannot less than ₹10" },
               max: { value: 50000, message: "Course Price cannot more than ₹50,000" },
               })}
               err={ coursetype === "Free" ? '' : errors?.price?.message}
              className={`flex flex-col border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px] ${coursetype === "Free" ? '' :errors.price ? "border-pink-500 text-pink-600" : "border-gray-300"}`} type="number"  placeholder={coursetype === "Free" ? "Free courses do not require a Price" :"Enter Price"} 
               disabled={coursetype === "Free"}
                />

            <label className='text-lg'>Price Discount</label>
            <Input 
              {...register("discount", {
                min: { value: 1, message: "Course Discount cannot less than 1" },
               max: { value: 99, message: "Course Discount cannot more than 99" },

              })}
              err={errors?.discount?.message}
              className="flex flex-col border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" type="number" placeholder={coursetype === "Free" ? "Free courses do not require a Discount" :"Enter Discount"} 
                disabled={coursetype === "Free"}

              />

            <div className='flex justify-between mt-10 pb-12'>
              <Button bgColor='' textColor=''  type="button" onClick={()=>dispatch(changetab("advanced"))}
                 className='border-2 border-gray-300 px-4 py-2 mr-2 cursor-pointer text-gray-400 hover:bg-gray-50'>Prevous</Button>
              <Button bgColor='bg-[#499FD6]' textColor='text-white' className='  px-4 py-2 mr-2 cursor-pointer border hover:text-[#499FD6] hover:bg-white'>Save & Next</Button>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default PriceingCourse
