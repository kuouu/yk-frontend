import Banner from "@/components/Banner"
import CourseCard from "@/components/CourseCard"

const getData = async () => {
  const res = await fetch(`${process.env.HOST_URL}/api/courses`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return data
}

const CourseList = async () => {
  const courses = await getData()

  return (
    <div>
      <Banner title={'精選課程'} />
      <div className="m-8 flex gap-8">
        {courses.map((course: CourseListType) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CourseList