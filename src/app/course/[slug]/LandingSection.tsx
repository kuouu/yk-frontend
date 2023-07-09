'use client'

import { Text, Row, Col } from "@nextui-org/react"
import { useCourseContext } from "./CourseContext"

const CourseLanding = () => {
  const course = useCourseContext()
  return (
    <Row wrap="wrap" justify="space-between" align="center">
      <div style={{ width: '58%' }}>
        <iframe
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${course.videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <Col css={{ width: '38%' }}>
        <h1 className="text-4xl">{course.title}</h1>
        <Text>by {course?.author}</Text>
        <Text css={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: 3
        }}>
          {course.excerpt}
        </Text>
        <Text css={{ textAlign: 'end' }}>{course?.student_count} 人已購買</Text>
      </Col>
    </Row>
  )
}

export default CourseLanding