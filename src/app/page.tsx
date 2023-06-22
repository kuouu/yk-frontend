import Jumbotron from "@/components/Jumbotron"
import HomeSection from "./HomeSection"
import TeacherSection from "./TeacherSection"

const getCourses = async () => {
  const res = await fetch(`${process.env.HOST_URL}/api/courses`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()

  return data
}

const Home = async () => {
  const imageSrc = [
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_1.png',
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_2.png',
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_3.png'
  ]
  const courses = await getCourses()
  return (
    <div>
      <Jumbotron imageSrc={imageSrc} />
      <HomeSection title={'熱門課程'} courses={courses} />
      <TeacherSection />
    </div>
  )
}

export default Home