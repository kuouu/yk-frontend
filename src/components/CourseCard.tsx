'use client'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react"

type Props = {
  course: CourseListType
}

const CourseCard = (props: Props) => {
  const { course } = props
  return (
    <Card
      className='border-none'
      isPressable
      isHoverable
      onPress={() => location.href = `/course/${course.slug}`}
    >
      <CardHeader className='flex justify-center'>
        <Image
          src={course.image}
          alt={course.title}
          width='100%'
          height={200}
          className="object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="flex justify-between gap-2">
          <h3 className='text-xl font-bold'>{course.title}</h3>
          <p className='text-red-500 text-lg min-w-max'>NT$ {course.price}</p>
        </div>
        <p className='text-gray-500'>by {course.author}</p>
      </CardBody>
      <CardFooter className="justify-between">
        <p className='text-gray-500'>{course.duration}</p>
        <p className='text-gray-500'>{course.student_count} 已註冊</p>
      </CardFooter>
    </Card>
  )
}

export default CourseCard