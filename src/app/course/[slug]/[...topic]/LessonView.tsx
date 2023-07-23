'use client';

import { Text, Col, Row } from '@nextui-org/react';
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
  return (
    <Col>
      <Text h3>{lesson.title}</Text>
      <YouTubeVideoPlayer url={lesson.videoId} />
      <div dangerouslySetInnerHTML={{
        __html: lesson.content.replace(/(&nbsp;)+/g, ' ')
      }} />
    </Col>
  )
}

export default LessonView