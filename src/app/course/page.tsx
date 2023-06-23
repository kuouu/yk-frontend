'use client'

import Banner from "@/components/Banner"
import CourseCard from "@/components/CourseCard"

import { useAppContext } from "@/appContext"

const CourseList = () => {
  const courses = useAppContext()

  return (
    <div>
      <Banner title={'精選課程'} />
      <div className="m-8 flex gap-8">
        {courses.map((course: CourseListType) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CourseList