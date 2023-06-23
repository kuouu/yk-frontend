import React from 'react'

function CoursePage({ params }: { params: { slug: string } }) {
  return (
    <div>Course: {params.slug}</div>
  )
}

export default CoursePage