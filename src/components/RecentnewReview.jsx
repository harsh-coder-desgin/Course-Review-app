import React, { useState } from 'react'
import Button from './Button';

function RecentnewReview({changetime}) {
    const [review,SetReview] = useState("Today")
    const [newreview,SetNewreview]=useState([])
    
  const submitreviewtime = async(time) =>{
    console.log(time);
    
    try {
      const data = await authcourse.getlatestreview({timereview:time})
      if (data) {
        SetNewreview(data.data.data)
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
   <div className='bg-white h-112 ml-15 mt-12'>
             <div className='flex justify-between border-b-1 border-gray-200 '>
              <h1 className='font-medium mt-5 ml-6 mb-3'>Recent new review </h1>
              <div className="relative inline-block mt-5 mr-9 group">
                <Button
                  bgColor=""
                  textColor=""
                  className="flex items-center gap-1 rounded-md hover:text-gray-400"
                >
                  {review}
                  <svg
                    className="w-5 h-5 transition-transform duration-200 transform group-hover:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    fill="currentColor"
                  >
                    <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
                  </svg>
                </Button>

                <div className="absolute -right-3 mt-3 hidden group-hover:block bg-white w-32   border border-gray-200 shadow-lg">
                  <Button className='px-4 pr-20 w-full py-2 hover:bg-gray-100' bgColor='' textColor=''
                  onClick={()=>{  SetReview("Today") 
                                submitreviewtime("Today")
                  }}
                  >Today</Button>
                  <Button className='px-4 pr-20 py-2  w-full hover:bg-gray-100' bgColor='' textColor=''
                  onClick={()=>{SetReview("Week")
                    submitreviewtime("Week")
                  }}
                  >Week</Button>
                    <Button className='px-4 py-2 pr-20 w-full hover:bg-gray-100' bgColor='' textColor=''
                  onClick={()=>{SetReview("Month")
                    submitreviewtime("Month")
                  }}
                  >Month</Button>
                </div>
              </div>
            </div>

            <div className='mt-4 w-127'>
            {newreview.length > 0 ?  newreview?.map((data) => (
                <div key={data._id} className='mt-2 '>
                  <div className='flex'>
                    <img src="/Screenshot 2025-10-09 220832.png" className='w-13 h-12  rounded-full ml-3 -mt-3' />
                    <p className='font-light ml-2 text-gray-900 text-[16px]'><a className='text-black text-[15px] mr-2 font-medium'>{data?.username}</a><a className='pl- pr-1 text-gray-500'>review on your</a>"{data.userreview}"</p>
                  </div>
                
                  <p className='ml-18 mt-1 text-[13px] text-gray-400 mb-4'>{timeAgo(data.createdAt)}</p>
                </div>
              )) : <p className='text-center text-gray-400 ml-13 mt-12'>No Review found</p>}
            </div>

          </div>
  )
}

export default RecentnewReview
