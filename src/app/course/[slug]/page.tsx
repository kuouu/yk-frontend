'use client';

import { redirect } from 'next/navigation'
import { useAppSelector } from "@/store/hook";
import { selectIsLogin } from "@/store/userSlice";
import { useCourseContext } from "./CourseContext";

import CourseTopics from "./CourseTopics";
import CourseInfo from "./CourseInfo";
import CourseLanding from "./LandingSection";
import CourseAbout from "./CourseAbout";
import CourseDescription from "./CourseDescription";

const CoursePage = () => {
  const course = useCourseContext()
  const isLogin = useAppSelector(selectIsLogin);
  const isEnrolled = useAppSelector(state =>
    state.user.enrolledCourses.includes(course.id)
  )
  if (isLogin && isEnrolled) {
    const firstTopic = course.topics[0]
    const firstLesson = firstTopic.lessons[0]
    redirect(`/course/${course.slug}/${firstTopic.id}/${firstLesson.id}`)
  }

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