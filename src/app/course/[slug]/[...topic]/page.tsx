'use client';

import { redirect } from 'next/navigation'
import { useAppSelector } from "@/store/hook";
import { selectIsLogin } from "@/store/userSlice";
import { useCourseContext } from "../CourseContext";

type Props = {
  params: { topic: string[] }
}

const CourseViewPage = ({ params }: Props) => {
  const topicId = params.topic[0]
  const lessonId = params.topic[1]
  const course = useCourseContext()
  const isLogin = useAppSelector(selectIsLogin);
  const isEnrolled = useAppSelector(state =>
    state.user.enrolledCourses.includes(course.id)
  )

  if (!isLogin || !isEnrolled) {
    redirect(`/course/${course.slug}`)
  }

  return (
    <div>page of topic {topicId} and lesson {lessonId} for {course.slug}</div>
  )
}

export default CourseViewPage