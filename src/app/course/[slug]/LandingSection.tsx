'use client'

import { Text } from "@nextui-org/react"

type Props = {
  courseDetails: any
}

const CourseLanding = ({ courseDetails }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl">{courseDetails.title}</h1>
      <iframe
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${courseDetails.videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <Text css={{ width: 640 }} blockquote>{courseDetails.excerpt}</Text>
    </div>
  )
}

export default CourseLanding