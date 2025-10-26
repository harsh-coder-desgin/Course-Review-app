import React, { useState } from 'react'
import CreatorHeading from '../components/CreatorHeading'
import { useForm } from "react-hook-form"
import { Button, Container, Input, Textarea } from '../components'

function Setting() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            //   title: course?.title || finalcoursedata?.title && finalcoursedata?.title.replace(/^"|"$/g, "") || '',
            //   subtitle: course?.subtitle || finalcoursedata?.subtitle  && finalcoursedata?.subtitle.replace(/^"|"$/g, "")|| '',
            //   coursecategory: course?.coursecategory || finalcoursedata?.coursecategory  &&  finalcoursedata?.coursecategory.replace(/^"|"$/g, "")|| 'Programming Languages',
            //   coursetopic: course?.coursetopic || finalcoursedata?.coursetopic && finalcoursedata?.coursetopic.replace(/^"|"$/g, "") || '',
            //   courselanguage: course?.courselanguage || finalcoursedata?.courselanguage && finalcoursedata?.courselanguage.replace(/^"|"$/g, "") || 'Hindi',
            //   courselevel: course?.courselevel || finalcoursedata?.courselevel && finalcoursedata?.courselevel.replace(/^"|"$/g, "") || 'Beginner',
            //   courseduration: course?.courseduration || finalcoursedata?.courseduration && finalcoursedata?.courseduration.replace(/^"|"$/g, "") || '1–5 hours',
        }
    })
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <CreatorHeading heading="Setting" />
            <div className='bg-gray-100 h-full mt-5 pb-11'>
                <div className='pt-8'>
                    <div className='bg-white borer ml-15 pt-1 w-10/11'>
                        <div className=' mt-5 ml-10 space-y-5'>
                            <h1 className='font-medium text-[28px] mt-9'>Account Settings</h1>
                            <div className='absolute right-[90px] top-45 bg-gray-200 p-5 pb-13'>
                                <input type="file" id="file-upload" accept="image/*"
                                    className='hidden' />
                                <label htmlFor="file-upload"><img src='/creatorprofile1.png' alt='profile' className='h-45 w-45 bordr object-cover' /></label>
                                <p className='w-45 text-sm mt-3 h-1 text-gray-500 font-light'>Image size should be 1 MB and ratio should br 1:1</p>
                            </div>
                            <Input label="Name"
                                className='flex flex-col border border-gray-300 w-1/2 mt-2 p-2 pl-4 placeholder:text-sm' placeholder="Enter Your Name" />

                            <Input label="Email"
                                className='flex flex-col border border-gray-300 w-1/2 mt-2 p-2 pl-4 placeholder:text-sm' placeholder="123@gmail.com" />

                            <Input label="Title"
                                className='flex flex-col border border-gray-300 w-2/3 mt-2 p-2 pl-4 ' placeholder="Your title,small biograph &  proffesion" />

                            <label className=''>Bio</label>
                            <Textarea
                                className='border border-gray-300 w-269 mt-2 px-4 py-2 placeholder:text-[15px]' rows={6} placeholder="Enter your descrption " />
                            <Button bgColor='bg-[#499FD6]' type="submit" textColor='text-white' className='mb-12 px-4 py-2 mr-2 cursor-pointer border hover:text-[#499FD6] hover:bg-white'>Save Changes</Button>
                        </div>
                    </div>

                    <div className='bg-white  ml-15 w-10/11'>
                        <div className=' mt-5 ml-10 space-y-5 pr-8'>
                            <h1 className='font-medium text-[28px] mt-9 pt-8'>Soical Profile</h1>
                            <label className=''>Personal Website</label>
                            <div className='flex mt-3'>
                                <img src='/Screenshot 2025-10-23 215428.png' alt='profile' className='h-12 w-12 p-1 border border-gray-300 object-cover' />
                                <Input
                                    className='flex flex-col border border-gray-300 h-12 w-full p-2 pl-4 placeholder:text-sm'
                                    placeholder="Personal website or portfilo"
                                />
                            </div>
                            <div className='flex justify-between'>

                                <div className=''>
                                    <label className=''>Github</label>
                                    <div className='flex mt-2'>
                                        <img src='/github2.png' alt='profile' className='h-12 w-12 pt-2 pb-2 pl-2 pr-[6px] border border-gray-300 object-cover' />
                                        <Input
                                            className='flex flex-col border border-gray-300 h-12 w-70 p-2 pl-4'
                                            placeholder="http/github.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label>Linkedin</label>
                                    <div className='flex mt-2'>
                                        <img src='/linkedinlogo2.png' alt='profile' className='h-12 w-12 p-2 border border-gray-300 object-cover' />
                                        <Input
                                            className='flex flex-col border border-gray-300 h-12 w-70 p-2 pl-4'
                                            placeholder="http/linkedin.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label>Youtube</label>
                                    <div className='flex mt-2'>
                                        <img src='/yt.png' alt='profile' className='h-12 w-12 p-3 pl-[10px] pr-[10px] border border-gray-300 object-cover' />
                                        <Input
                                            className='flex flex-col border border-gray-300 h-12 w-70 p-2 pl-4'
                                            placeholder="http:/youtube.com"
                                        />
                                    </div>
                                </div>

                            </div>
                            <Button bgColor='bg-[#499FD6]' type="submit" textColor='text-white' className='mb-12 px-4 py-2 mr-2 cursor-pointer border hover:text-[#499FD6] mt-2 hover:bg-white'>Save Changes</Button>

                        </div>
                    </div>

                    <div className='bg-white  ml-15 w-10/11'>
                        <div className=' mt-5 ml-10 space-y-10 pr-8'>
                            <h1 className='font-medium text-[28px] mt-9 mb-8 pt-8'>Change Password</h1>

                            <Input
                                label="Current Password"
                                className='flex flex-col border border-gray-300 h-12 w-full mt-2 p-2 pl-4 placeholder:text-sm'
                                placeholder="Write Your Current Password"
                            />
                             <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-23 -mt-18 mr-3"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12s3.75 7.5 9.75 7.5a9.72 9.72 0 004.65-1.223M6.228 6.228A9.72 9.72 0 0111.25 4.5c6 0 9.75 7.5 9.75 7.5a10.45 10.45 0 01-2.221 3.772M6.228 6.228L3 3m3.228 3.228L3 3m0 0l18 18" />
                                    </svg>
                                )}
                            </button>
                            <Input
                                label="New Password"
                                className='flex flex-col border border-gray-300 h-12 w-full mt-2 p-2 pl-4 placeholder:text-sm'
                                placeholder="Write Your New Password"
                            />
                             <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-23 -mt-18 mr-3"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12s3.75 7.5 9.75 7.5a9.72 9.72 0 004.65-1.223M6.228 6.228A9.72 9.72 0 0111.25 4.5c6 0 9.75 7.5 9.75 7.5a10.45 10.45 0 01-2.221 3.772M6.228 6.228L3 3m3.228 3.228L3 3m0 0l18 18" />
                                    </svg>
                                )}
                            </button>
                            <Input
                                label="Confirm Password"
                                className='flex flex-col border border-gray-300 h-12 w-full mt-2 p-2 pl-4 placeholder:text-sm'
                                placeholder="Write Your Confirm New Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-23 -mt-18 mr-3"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12s3.75 7.5 9.75 7.5a9.72 9.72 0 004.65-1.223M6.228 6.228A9.72 9.72 0 0111.25 4.5c6 0 9.75 7.5 9.75 7.5a10.45 10.45 0 01-2.221 3.772M6.228 6.228L3 3m3.228 3.228L3 3m0 0l18 18" />
                                    </svg>
                                )}
                            </button>
                            <Button bgColor='bg-[#499FD6]' type="submit" textColor='text-white' className='mb-12 px-4 py-2 mr-2 cursor-pointer border hover:text-[#499FD6] mt-2 hover:bg-white'>Save Changes</Button>

                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Setting
