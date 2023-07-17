'use client'

import Jumbotron from "./Jumbotron"
import HomeSection from "./HomeSection"
import TeacherSection from "./TeacherSection"
import { useAppSelector } from "@/store/hook"
import { courseList } from "@/store/courseSlice"

const Home = () => {
  const imageSrc = [
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_1.png',
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_2.png',
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_3.png'
  ]
  const courses = useAppSelector(courseList)
  return (
    <div>
      <Jumbotron imageSrc={imageSrc} />
      <HomeSection title={'熱門課程'} courses={courses} />
      <TeacherSection />
    </div>
  )
}

export default Home