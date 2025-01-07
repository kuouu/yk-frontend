'use client'

import { useCourseContext } from "./CourseContext"

const CourseAbout = () => {
  const course = useCourseContext()
  const date = new Date(course!.date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const topicNum = course.topics.length
  const lessonNum = course.topics.reduce((acc: number, topic: any) => {
    return acc + topic.lessons.length
  }, 0)
  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold my-4">關於課程</h3>
      <div className="grid jusitfy-center gap-2 grid-cols-2">
        <div>
          <p><b>課程時長</b>&emsp;{course?.duration}</p>
        </div>
        <div>
          <p><b>單元數量</b>&emsp;{topicNum} 章節 {lessonNum} 單元</p>
        </div>
        <div>
          <p><b>開課日期</b>&emsp;{date}</p>
        </div>
        <div>
          <p><b>課程人數</b>&emsp;{course?.student_count} 位同學</p>
        </div>
      </div>
    </div>
  )
}

export default CourseAbout