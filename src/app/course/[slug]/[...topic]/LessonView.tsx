'use client';

import { Spinner } from '@heroui/react';
import { useAppSelector } from "@/store/hook";
import { selectLessonById } from '@/store/topicSlice';
import YouTubeVideoPlayer from '@/components/YouTubeVideoPlayer';

type Props = {
  lessonId: number
}

const LessonView = ({ lessonId }: Props) => {
  const lesson = useAppSelector(state =>
    selectLessonById(state, lessonId)
  )
  if(lesson === undefined) return (
    <div className="flex justify-center items-center h-full">
      <Spinner color="primary" />
    </div>
  )
  return (
    <div>
      <h3>{lesson.title}</h3>
      <YouTubeVideoPlayer url={lesson.videoId} />
      <div dangerouslySetInnerHTML={{
        __html: lesson.content.replace(/(&nbsp;)+/g, ' ')
      }} />
    </div>
  )
}

export default LessonView