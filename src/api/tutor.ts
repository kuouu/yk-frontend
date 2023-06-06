const END_POINT = `${process.env.END_POINT}/wp-json/tutor/v1`

export async function getCourses() {
  const response = await fetch(`${END_POINT}/courses`)
    .then(res => res.json())
    .then(data => data.data.posts)

  return response;
}