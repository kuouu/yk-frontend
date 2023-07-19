import CourseTopics from "./CourseTopics";
import CourseInfo from "./CourseInfo";
import CourseLanding from "./LandingSection";
import CourseAbout from "./CourseAbout";
import CourseDescription from "./CourseDescription";

const CoursePage = () => {
  return (
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
  )
}

export default CoursePage