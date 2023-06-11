import Image from "next/image"

import { CourseType } from "@/types/wooCommerceTypes"

type Props = {
  title: string
  courses: CourseType[]
}

const HomeSection = (props: Props) => {
  const { title, courses } = props
  const CourseCard = (props: { course: CourseType }) =>
    <div className='flex flex-col'>
      <Image
        className='w-full mb-4'
        src={props.course.image}
        alt={props.course.name}
        width={300}
        height={200}
      />
      <h3 className='text-xl font-bold'>{props.course.name}</h3>
      <p className='text-red-700'>{props.course.price}</p>
    </div>
  return (
    <section className='p-10'>
      <h2 className='text-3xl font-bold mb-8'>{title}</h2>
      <div className="flex gap-8">
        {courses.map((course) =>
          <CourseCard key={'course-' + course.id} course={course} />
        )}
      </div>
    </section>
  )
}

export default HomeSection