'use client'

import { Text, Col } from "@nextui-org/react"
import { useCourseContext } from "./CourseContext"

const CourseDescription = () => {
  const course = useCourseContext()
  return (
    <Col>
      <Text h3>課程介紹</Text>
      <div dangerouslySetInnerHTML={{
        __html: course.content.replace(/(&nbsp;)+/g, ' ')
      }} />
    </Col>
  )
}

export default CourseDescription