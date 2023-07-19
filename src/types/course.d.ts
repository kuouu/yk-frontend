type CourseType = CourseListType & CourseDetailType;

type CourseListType = {
  id: number,
  title: string,
  slug: string,
  date: Date,
  duration: string,
  author: string,
  price: number,
  sale_price: number | undefined,
  image: string,
  student_count: number,
}

type CourseDetailType = {
  id: number,
  title: string,
  content: string,
  excerpt: string,
  videoId: string,
  material_includes: string,
  target_audience: string,
  topics: CourseTopicType[],
}

type CourseTopicType = {
  id: number,
  title: string,
  lessons: CourseLessonType[],
}

type CourseLessonType = {
  id: number,
  title: string,
  duration: string,
}