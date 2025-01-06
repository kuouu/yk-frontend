'use client'

import { Card, Row } from "@nextui-org/react"

type Props = {
  course: CourseListType
}

const CourseCard = (props: Props) => {
  const { course } = props
  return (
    <Card
      css={{ border: 'none', width: '300px' }}
      isPressable
      isHoverable
      variant="shadow"
      onPress={() => location.href = `/course/${course.slug}`}
    >
      <Card.Header>
        <Card.Image
          src={course.image}
          alt={course.title}
          width={300}
          height={200}
        />
      </Card.Header>
      <Card.Body>
        <Row justify="space-between">
          <h3 className='text-xl font-bold'>{course.title}</h3>
          <p className='text-red-500 text-lg'>NT$ {course.price}</p>
        </Row>
        <p className='text-gray-500'>by {course.author}</p>
      </Card.Body>
      <Card.Footer>
        <Row justify="space-between">
          <p className='text-gray-500'>{course.duration}</p>
          <p className='text-gray-500'>{course.student_count} 已註冊</p>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default CourseCard