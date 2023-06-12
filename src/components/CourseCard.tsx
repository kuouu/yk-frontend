import Image from "next/image"
import { CourseType } from "@/types/wooCommerceTypes"

type Props = {
  course: CourseType
}

const CourseCard = (props: Props) => {
  const { course } = props
  return (
    <div className='flex flex-col'>
      <Image
        className='w-full mb-4'
        src={course.image}
        alt={course.name}
        width={300}
        height={200}
      />
      <h3 className='text-xl font-bold'>{course.name}</h3>
      <p className='text-red-700'>{course.price}</p>
    </div>
  )
}

export default CourseCard