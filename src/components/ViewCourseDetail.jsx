import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CreatorHeading from './CreatorHeading';
import RecentnewReview from './RecentnewReview';
import RatingChart from './Chart/RatingChart';
import OverReviewChart from './Chart/OverReviewChart';

function ViewCourseDetail() {
    const { id } = useParams()
    console.log(id);
      const [dataavreagerating,SetDataavreagerating]=useState([])
    

    return (
        <div>
            <CreatorHeading heading="My Courses" />
            <div className='bg-gray-100 h-full mt-5 pb-11'>
                <div className='pt-8'>
                    <div className='flex bg-white borer ml-15 pt-1 w-10/11'>
                        <img src='/demoimage.png' alt='logo' className='h-80 w-110 p-4' />
                        <div className='w-191'>
                            <div className='flex mt-4 mb-2'>
                                <p className='font-light text-gray-400 text-sm'>Upload at : <a className='font-light text-black'>Jan 12,2020</a></p>
                                <p className='font-light text-gray-400  text-sm ml-3'>Last Updated : <a className='font-light text-black'>Sep 12,2021</a></p>
                            </div>
                            <h1 className='font-medium text-2xl'>Complete Python Programming lanuage </h1>
                            <p className='text-gray-500 text-sm mt-2 w-170'>When executing scripts in an HTML page, the page becomes unresponsive until the script is finished.
                                A web worker is an external JavaScript file that runs in the background, independently of other scripts, without affecting the performance of the page. You can continue to do whatever you want: clicking, selecting things, etc.</p>
                            <div className=' flex justify-between border-b-1 border-gray-300 pb-3 '>
                                <div className='flex'>
                                    <img src='/creatorprofile1.png' alt='text' className='w-12 h-12 mt-3 rounded-full' />
                                    <div className='mt-3 ml-2'>
                                        <p className='font-meduim text-gray-400 text-sm'>Created by</p>
                                        <p className='font-bold text-[15px]'>Chai aur code</p>
                                    </div>
                                </div>
                                <p className='mt-7 mr-4 text-sm'>star 4.5 <a className='text-gray-400'>(1,200 rating)</a></p>
                            </div>
                            <div className='flex'>
                                <p className='line-through font-extralight text-2xl mt-3 ml-1 text-gray-500'>150₹</p>
                                <div className='ml-2'>
                                    <p className='font-meduim text-2xl mt-3 ml-1'>300₹</p>
                                    <p className='text-gray-400 text-sm ml-1'>Course price</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 mr-10'>
                        <RecentnewReview changetime={"Today"}/>
                        {/* <RatingChart rating={ratingtime}  allrating={dataavreagerating?.allrating}/> */}
                    </div>
                     <div className='bg-white ml-15 mr-10'> 
          <OverReviewChart monthlyreview={dataavreagerating.monthlyreview || []}/> 
          </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCourseDetail
