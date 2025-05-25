'use client';

import { redirect } from 'next/navigation'
import { useAppSelector } from "@/store/hook";
import { selectIsLogin } from "@/store/userSlice";
import { useCourseContext } from "../CourseContext";
import { Grid } from '@heroui/react';
import LessonNavigator from './LessonNavigator';
import LessonView from './LessonView';

type Props = {
  params: { topic: string[] }
}

const CourseViewPage = ({ params }: Props) => {
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
    <Grid.Container css={{ padding: '2rem' }}>
      <Grid xs={4}>
        <LessonNavigator />
      </Grid>
      <Grid xs={8}>
        <LessonView lessonId={Number(lessonId)} />
      </Grid>
    </Grid.Container>
  )
}

export default CourseViewPage