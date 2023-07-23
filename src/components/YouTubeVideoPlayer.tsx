import React, { useState } from 'react';

interface YouTubeVideoPlayerProps {
  url: string;
}

const YouTubeVideoPlayer: React.FC<YouTubeVideoPlayerProps> = ({ url }) => {
  const [videoId, setVideoId] = useState<string | null>(null);

  // Function to extract the video ID from the YouTube URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // When the component mounts, extract the video ID from the URL
  React.useEffect(() => {
    const videoId = getYouTubeVideoId(url);
    setVideoId(videoId);
  }, [url]);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <div>
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeVideoPlayer;
