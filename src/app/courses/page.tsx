import Banner from "@/components/Banner"
import CourseCard from "@/components/CourseCard"
import { getCourses } from "@/api/graphql"
import { CourseType } from "@/types/wooCommerceTypes"

const CoursePage = async () => {
  const courses = await getCourses()
  return (
    <div>
      <Banner title={'精選課程'} />
      <div className="m-8 flex gap-8">
        {courses.map((course: CourseType) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CoursePage