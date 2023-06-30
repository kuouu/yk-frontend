'use client'

import { Text, Row, Col } from "@nextui-org/react"
import { useAppContext } from "@/appContext"

type Props = {
  courseDetails: any
}

const CourseLanding = ({ courseDetails }: Props) => {
  const courseList = useAppContext()
  const course = courseList.find((course) => course.id === courseDetails.id)
  return (
    <Row wrap="wrap" justify="space-between" align="center">
      <div style={{ width: '58%' }}>
        <iframe
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${courseDetails.videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <Col css={{ width: '38%' }}>
        <h1 className="text-4xl">{courseDetails.title}</h1>
        <Text>by {course?.author}</Text>
        <Text css={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: 3
        }}>
          {courseDetails.excerpt}
        </Text>
        <Text css={{ textAlign: 'end' }}>{course?.student_count} 人已購買</Text>
      </Col>
    </Row>
  )
}

export default CourseLanding