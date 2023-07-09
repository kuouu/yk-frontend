import { customFetch } from "@/utils/customFetch";
import CourseTopics from "./CourseTopics";
import CourseInfo from "./CourseInfo";
import CourseLanding from "./LandingSection";
import CourseAbout from "./CourseAbout";
import CourseDescription from "./CourseDescription";
import { store } from "@/store";
import { selectCourseById } from "@/store/courseSlice";
import CourseContextProvider from "./CourseContext";

const getCourseDetails = async (slug: string) => {
  const url = `${process.env.HOST_URL}/api/course-detail/${slug}`;
  const res = await customFetch(url);
  return res;
}

const CoursePage = async ({ params }: { params: { slug: string } }) => {
  const courseDetails = await getCourseDetails(params.slug)
  const course = selectCourseById(store.getState().server, courseDetails.id)
  return (
    <CourseContextProvider course={{ ...course, ...courseDetails }}>
      <div className="p-8">
        <CourseLanding />
        <div className="flex gap-4 mt-8">
          <div className="grow grid gap-4">
            <CourseAbout />
            <CourseDescription />
            <CourseTopics />
          </div>
          <div className="flow-0">
            <CourseInfo />
          </div>
        </div>
      </div>
    </CourseContextProvider>
  )
}

export default CoursePage