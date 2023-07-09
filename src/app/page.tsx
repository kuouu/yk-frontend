import { store } from "@/store"
import Jumbotron from "./Jumbotron"
import HomeSection from "./HomeSection"
import TeacherSection from "./TeacherSection"
import { courseListSelector } from "@/store/courseSlice"

const Home = () => {
  const imageSrc = [
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_1.png',
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_2.png',
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_3.png'
  ]
  const courseList = courseListSelector(store.getState().server)
  return (
    <div>
      <Jumbotron imageSrc={imageSrc} />
      <HomeSection title={'熱門課程'} courses={courseList} />
      <TeacherSection />
    </div>
  )
}

export default Home