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
      <div className="m-8 flex gap-8">
        {courses.map((course: CourseListType) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CourseList