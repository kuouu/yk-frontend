'use client'

import { useCourseContext } from "./CourseContext"
import YouTubeVideoPlayer from "@/components/YouTubeVideoPlayer"

const CourseLanding = () => {
  const course = useCourseContext()
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ width: '58%' }}>
        <YouTubeVideoPlayer url={course.videoId} />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '38%'
      }}>
        <h1 className="text-4xl">{course.title}</h1>
        <p>by {course?.author}</p>
        <p style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: 3
        }}>
          {course.excerpt}
        </p>
        <p style={{ textAlign: 'end' }}>{course?.student_count} 人已購買</p>
      </div>
    </div>
  )
}

export default CourseLanding