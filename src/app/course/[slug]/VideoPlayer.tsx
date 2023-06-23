import React from 'react'

type Props = {
  videoId: string
}

const VideoPlayer = ({ videoId }: Props) => {
  return (
    <iframe
      width="100%"
      height="600px"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  )
}

export default VideoPlayer