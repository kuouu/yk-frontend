import Jumbotron from "@/components/Jumbotron"
import HomeSection from "./HomeSection"
import TeacherSection from "./TeacherSection"
import { getCarouselImages, getCourses } from "@/api/graphql"
const Home = async () => {
  const imageSrc = await getCarouselImages()
  const courses = await getCourses()
  return (
    <div>
      <Jumbotron imageSrc={imageSrc}/>
      <HomeSection title={'熱門課程'} courses={courses}/>
      <TeacherSection />
    </div>
  )
}

export default Home