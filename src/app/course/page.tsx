import Banner from "@/components/Banner"
import CourseCard from "@/components/CourseCard"

const getData = async () => {
  try {
    const res = await fetch(`${process.env.HOST_URL}/api/courses`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

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