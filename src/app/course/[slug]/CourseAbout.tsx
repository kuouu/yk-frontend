'use client'

import { Text, Col, Grid } from "@nextui-org/react"
import { useCourseContext } from "./CourseContext"

const CourseAbout = () => {
  const course = useCourseContext()
  const date = new Date(course!.date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const topicNum = course.topics.length
  const lessonNum = course.topics.reduce((acc: number, topic: any) => {
    return acc + topic.lessons.length
  }, 0)
  return (
    <Col>
      <Text h3>關於課程</Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={6}>
          <Text><b>課程時長</b>&emsp;{course?.duration}</Text>
        </Grid>
        <Grid xs={6}>
          <Text><b>單元數量</b>&emsp;{topicNum} 章節 {lessonNum} 單元</Text>
        </Grid>
        <Grid xs={6}>
          <Text><b>開課日期</b>&emsp;{date}</Text>
        </Grid>
        <Grid xs={6}>
          <Text><b>課程人數</b>&emsp;{course?.student_count} 位同學</Text>
        </Grid>
      </Grid.Container>
    </Col>
  )
}

export default CourseAbout