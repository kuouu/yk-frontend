import { customFetch } from "@/customFetch";
import CourseTopics from "./CourseTopics";
import CourseInfo from "./CourseInfo";
import CourseLanding from "./LandingSection";

const getCourseDetails = async (slug: string) => {
  const url = `${process.env.HOST_URL}/api/course-detail/${slug}`;
  const res = await customFetch(url);
  return res;
}

const CoursePage = async ({ params }: { params: { slug: string } }) => {
  const courseDetails = await getCourseDetails(params.slug)
  return (
    <div className="p-8">
      <CourseLanding courseDetails={courseDetails} />
      <div className="flex gap-4">
        <div className="grow">
          <div dangerouslySetInnerHTML={{
            __html: courseDetails.content.replace(/(&nbsp;)+/g, ' ')
          }} />
          <CourseTopics topics={courseDetails.topics} />
        </div>
        <div className="flow-0">
          <CourseInfo courseDetails={courseDetails} />
        </div>
      </div>
    </div>
  )
}

export default CoursePage