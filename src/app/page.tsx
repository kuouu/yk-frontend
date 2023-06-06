import Jumbotron from "@/components/Jumbotron"
import { getCarouselImages } from "@/api/graphql"
const Home = async () => {
  const imageSrc = await getCarouselImages()
  return (
    <div>
      <Jumbotron imageSrc={imageSrc}/>
      Home
    </div>
  )
}

export default Home