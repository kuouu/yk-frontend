'use client'

import Banner from "@/components/Banner"
import CourseCard from "@/components/CourseCard"
import { useAppSelector } from "@/store/hook"
import { courseList } from "@/store/courseSlice"

const CourseList = () => {
  const courses = useAppSelector(courseList)
  return (
    <div>
      <Banner title={'精選課程'} />
      <div className="m-8 gap-8 grid grid-cols-3">
        {courses.map((course: CourseListType) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CourseList