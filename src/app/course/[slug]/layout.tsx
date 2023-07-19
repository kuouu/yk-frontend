import CourseContextProvider from "./CourseContext";
import { customFetch } from "@/utils/customFetch";
import { store } from "@/store";
import { selectCourseById } from "@/store/courseSlice";


type Props = {
  params: { slug: string },
  children: React.ReactNode
}

const getCourseDetails = async (slug: string) => {
  const url = `${process.env.HOST_URL}/api/courses/${slug}`;
  const res = await customFetch(url);
  return res;
}

const layout = async ({ params, children }: Props) => {
  const courseDetails = await getCourseDetails(params.slug)
  const course = selectCourseById(store.getState().courses, courseDetails.id)
  return (
    <CourseContextProvider course={{ ...course, ...courseDetails }}>
      {children}
    </CourseContextProvider>
  )
}

export default layout