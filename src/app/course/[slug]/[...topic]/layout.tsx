import { customFetch } from "@/utils/customFetch";
import Preloader from "./Preloader";

type Props = {
  params: { topic: string[] }
  children: React.ReactNode
}

const getTopicDetails = async (topicId: string) => {
  const url = `${process.env.HOST_URL}/api/courses/topic?id=${topicId}`;
  const res = await customFetch(url);
  return res;
}

const layout = async ({ params, children }: Props) => {
  const topicId = params.topic[0]
  const topicDetails = await getTopicDetails(topicId)
  return (
    <div>
      <Preloader topic={topicDetails} />
      {topicDetails ? children : null}
    </div>
  )
}

export default layout