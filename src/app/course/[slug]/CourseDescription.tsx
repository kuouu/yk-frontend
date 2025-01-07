'use client'

import { useCourseContext } from "./CourseContext"

const CourseDescription = () => {
  const course = useCourseContext()
  return (
    <div className="flex flex-col">
      <h3>課程介紹</h3>
      <div dangerouslySetInnerHTML={{
        __html: course.content.replace(/(&nbsp;)+/g, ' ')
      }} />
    </div>
  )
}

export default CourseDescription