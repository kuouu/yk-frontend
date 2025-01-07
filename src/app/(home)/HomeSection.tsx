import CourseCard from "@/components/CourseCard"

type Props = {
  title: string
  courses: CourseListType[]
}

const HomeSection = (props: Props) => {
  const { title, courses } = props
  return (
    <section className='p-10'>
      <h2 className='text-3xl font-bold mb-8 pl-4 border-l-4 border-sky-400'>{title}</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
        {Array.isArray(courses) && courses.map((course) =>
          <CourseCard key={'course-' + course.id} course={course} />
        )}
      </div>
    </section>
  )
}

export default HomeSection