'use client'

import { Col, Divider, Row, Text, Image } from "@heroui/react"
import { useAppSelector } from "@/store/hook"
import { courseList } from "@/store/courseSlice"

const EnrollCourses = () => {
  const courses = useAppSelector(courseList);
  const enrolledId = useAppSelector(state => state.user.enrolledCourses)
  return (
    <Col>
      <Text h3>我的課程</Text>
      <Divider css={{ margin: '10px 0' }} />
      <Row
        gap={2}
        css={{
          margin: '0',
          paddingTop: '10px',
          overflowX: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' }
        }}
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
              <Col
                key={course.id}
                css={{ width: 'max-content', cursor: 'pointer' }}
                onClick={() => location.href = `/course/${course.slug}`}
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  width={300}
                  height={200}
                />
                <Col css={{ marginTop: '10px', padding: 0 }}>
                  <Text size='$lg' css={{ margin: 0 }}>{course.title}</Text>
                  <p className='text-gray-500'>by {course.author}</p>
                </Col>
              </Col>
            )
          })}
      </Row>
    </Col>
  )
}

export default EnrollCourses