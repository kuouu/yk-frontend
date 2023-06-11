import Jumbotron from "@/components/Jumbotron"
import HomeSection from "./HomeSection"
import { getCarouselImages, getCourses } from "@/api/graphql"
const Home = async () => {
  const imageSrc = await getCarouselImages()
  const courses = await getCourses()
  return (
    <div>
      <Jumbotron imageSrc={imageSrc}/>
      <HomeSection title={'熱門課程'} courses={courses}/>
    </div>
  )
}

export default Home