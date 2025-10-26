import React, { useState } from 'react'
import CreatorHeading from '../components/CreatorHeading'
import { Button, Input, Textarea } from '../components'
import Select from '../components/Select'
import CourseCard from '../components/CourseCard'
import { Link } from 'react-router-dom'

function AllCourse() {
    const [courses,SetCourses]=useState([
        {id:1,img:"/backendtest.png",des:"At W3Schools you will find complete references about HTML elements, attributes, events, color names,..",title:"Complete Python Programming lanuage ",name:"Chai aur code",star:"⭐⭐⭐⭐⭐ 1.2k",p:"100rs",d:"150"},
        {id:2,img:"/backendtest.png",des:"At W3Schools you will find complete references about HTML elements, attributes, events, color names,..",title:"Complete Python Programming lanuage ",name:"Chai aur code",star:"⭐⭐⭐⭐⭐ 1.2k",p:"100rs",d:"150"},
        {id:3,img:"/backendtest.png",des:"At W3Schools you will find complete references about HTML elements, attributes, events, color names,..",title:"Complete Python Programming lanuage ",name:"Chai aur code",star:"⭐⭐⭐⭐⭐ 1.2k",p:"100rs",d:"150"},
                {id:4,img:"/backendtest.png",des:"At W3Schools you will find complete references about HTML elements, attributes, events, color names,..",title:"Complete Python Programming lanuage ",name:"Chai aur code",star:"⭐⭐⭐⭐⭐ 1.2k",p:"100rs",d:"150"},
    ])
    const [On,SetOn] = useState("Year")

    const handleoption =(id)=>{
        // SetOn((prev) => ({ ...!prev, [id]: true, }));
        SetOn(id)
          console.log(On);
            // console.log(On[id]);
            
    }
    return (
        <div>
            <CreatorHeading heading="My Courses" />
            <div className='bg-gray-100 h-full mt-5 pb-11'>
                <div className='ml-16 pt-15'>
                    <div className='flex space-x-10'>
                        <Input label="Search"
                            className='bg-white flex flex-col border border-gray-300 w-110 mt-2 pl-5 py-[15px] placeholder:text-sm' placeholder="Search in your courses" />
                        <Select
                            label="Sort by:"
                            options={["Latest",
                                "Oldest",
                                "Most Popular",
                                "Highest Rated",
                                "Lowest Price",
                                "Highest Price"]}
                            className='bg-white w-55 px-2 py-[16px] border border-gray-300 flex mt-2'
                        />
                        <Select
                            label="Category"
                            options={["All Categories",
                                "Web Development",
                                "Frontend",
                                "Backend",
                                "Full Stack",
                                "Data Science",
                                "Machine Learning",
                                "Design",
                                "Mobile Development",
                                "Game Development",
                                "Cloud & DevOps"]}
                            className='bg-white w-50 px-2 py-[16px] border border-gray-300 flex mt-2'
                        />
                        <Select
                            label="Rating"
                            options={["All Ratings",
                                "5 Stars",
                                "4 Stars & Up",
                                "3 Stars & Up",
                                "2 Stars & Up",
                                "1 Stars & Up"]}
                            className='bg-white w-48 px-2 py-[16px] border border-gray-300 flex mt-2'
                        />
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                        {courses.map((course)=>(
                            <div key={course.id}>
                                 {/* <Button onClick={()=>SetOn(course.id)} textColor='' bgColor=''  className=" absolute ml-77 mt-1 bg-white w-10 h-10 flex items-center justify-center text-center pb-2 rounded-full text-2xl">
                                    ...
                                    </Button> */}
                                    {/* { On === course.id &&
                                    <div className=' bg-white w-40 absolute ml-48 mt-11 pt-2 pb-2'>
                                      <Link> <p className='hover:bg-[#499FD6] hover:text-white px-6 py-1'>View Detail</p></Link> 
                                    <p className='hover:bg-[#499FD6] hover:text-white px-6 py-1'>Edit Coures</p>
                                     <p className='hover:bg-[#499FD6] hover:text-white px-6 py-1'>Delete Coures</p>
                                        </div>
                                    } */}
                                         <div className="absolute inline-block mt-2 mr-9 ml-76 group">
                                                    <Button
                                                      bgColor=""
                                                      textColor=""
                                                      className="flex bg-white w-10 h-10  items-center justify-center text-center pb-3 rounded-full text-2xl"
                                                    >
                                                      ...
                                                     
                                                    </Button>
                                    
                                                    <div className="absolute -right-3 hidden group-hover:block bg-white w-38   border border-gray-200 shadow-lg">
                                                     <Link to={`/creator/mycourse/detail/${course.id}`}>
                                                     <Button className='mt-2 pr-6 w-full hover:bg-[#499FD6] hover:text-white px-6 py-1' bgColor='' textColor=''
                                                      >View Detail</Button>
                                                     </Link>
                                                     <Link to={`/creator/mycourse/edit/${course.id}`}>
                                                       <Button className=' pr-4 w-full hover:bg-[#499FD6] hover:text-white px-6 py-1' bgColor='' textColor=''
                                                     
                                                      >Edit Course</Button>
                                                     </Link>
                                                      <Button className='mb-2 pr-4 w-full hover:bg-[#499FD6] hover:text-white px-6 py-1' bgColor='' textColor=''
                                                     
                                                      >Delete Course</Button>
                                                    </div>
                                                  </div>
                                <CourseCard course={course}/>
                               
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllCourse
