'use client'

import { Divider, Image } from "@heroui/react"
import { useAppSelector } from "@/store/hook"
import { courseList } from "@/store/courseSlice"

const EnrollCourses = () => {
  const courses = useAppSelector(courseList);
  const enrolledId = useAppSelector(state => state.user.enrolledCourses)
  return (
    <div className="flex flex-col gap-4">
      <h3>我的課程</h3>
      <Divider/>
      <div
        className="flex justify-between items-center gap-2"
      >
        {courses
          .filter((course: CourseListType) => {
            const isEnrolled = enrolledId.find((enrolledCourseId: Number) =>
              enrolledCourseId === course.id
            )
            return isEnrolled
          })
          .map((course: CourseListType) => {
            return (
              <div
                className="flex flex-col items-center gap-2 cursor-pointer"
                key={course.id}
                onClick={() => location.href = `/course/${course.slug}`}
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  width={300}
                  height={200}
                />
                <div className="flex flex-col items-center gap-1 text-center">                
                  <p className="text-lg m-0">{course.title}</p>
                  <p className='text-gray-500'>by {course.author}</p>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default EnrollCourses