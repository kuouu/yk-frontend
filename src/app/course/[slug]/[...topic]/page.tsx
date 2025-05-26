'use client';

import React, { use } from 'react';
import { redirect } from 'next/navigation'
import { useAppSelector } from "@/store/hook";
import { selectIsLogin } from "@/store/userSlice";
import { useCourseContext } from "../CourseContext";
import LessonNavigator from './LessonNavigator';
import LessonView from './LessonView';

type Props = {
  params: Promise<{ topic: string[] }>
}

const CourseViewPage = ({ params }: Props) => {
  const unwrappedParams = use(params)
  const lessonId = unwrappedParams.topic[1];
  const course = useCourseContext()
  const isLogin = useAppSelector(selectIsLogin);
  const isEnrolled = useAppSelector(state =>
    state.user.enrolledCourses.includes(course.id)
  )

  if (!isLogin || !isEnrolled) {
    redirect(`/course/${course.slug}`)
  }

  return (
    <div className='grid grid-cols-3 p-2 gap-4'>
      <div>
        <LessonNavigator />
      </div>
      <div className='col-span-2'>
        <LessonView lessonId={Number(lessonId)} />
      </div>
    </div>
  )
}

export default CourseViewPage