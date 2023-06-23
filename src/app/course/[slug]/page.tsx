import CourseContent from "./CourseContent";
import CourseInfo from "./CourseInfo";
import VideoPlayer from "./VideoPlayer";

const getCourseDetails = async (slug: string) => {
  try {
    const res = await fetch(`${process.env.HOST_URL}/api/course-detail/${slug}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch course details');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const CoursePage = async ({ params }: { params: { slug: string } }) => {
  const courseDetails = await getCourseDetails(params.slug)
  return (
    <div className="p-8">
      <h1 className="text-2xl">{courseDetails.title}</h1>
      <VideoPlayer videoId={courseDetails.videoId} />
      <div className="flex">
        <div className="grow">
          <div dangerouslySetInnerHTML={{ __html: courseDetails.content }} />
          <p>{courseDetails.excerpt}</p>
          <CourseContent />
        </div>
        <div className="flow-0">
          <div className="sticky top-0">
            <CourseInfo
              material_includes={courseDetails.material_includes}
              target_audience={courseDetails.target_audience}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default CoursePage