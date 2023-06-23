'use client'

import Jumbotron from "@/components/Jumbotron"
import HomeSection from "./HomeSection"
import TeacherSection from "./TeacherSection"

import { useAppContext } from "@/appContext"

const Home = () => {
  const imageSrc = [
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_1.png',
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_2.png',
    'https://yourknowledge.online/wp-content/uploads/2023/01/carousel_3.png'
  ]
  const courses = useAppContext()
  return (
    <div>
      <Jumbotron imageSrc={imageSrc} />
      <HomeSection title={'熱門課程'} courses={courses} />
      <TeacherSection />
    </div>
  )
}

export default Home