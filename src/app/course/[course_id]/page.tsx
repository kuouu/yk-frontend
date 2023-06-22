import React from 'react'

function CoursePage({ params }: { params: { course_id: string } }) {
  return (
    <div>Course: {params.course_id}</div>
  )
}

export default CoursePage