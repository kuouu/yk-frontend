import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const course = await prisma.wp_posts.findFirst({
    where: {
      post_name: params.slug
    },
    select: {
      ID: true,
      post_title: true,
      post_content: true,
      post_excerpt: true
    }
  });
  const TUTOR_API = `${process.env.END_POINT}/wp-json/tutor/v1`;
  const id = Number(course?.ID);
  const tutorDetail = await fetch(`${TUTOR_API}/course-detail/${id}`)
    .then(res => res.json());
  console.log(tutorDetail.data.target_audience);
  return NextResponse.json({
    id: Number(course?.ID),
    title: course?.post_title,
    content: course?.post_content,
    excerpt: course?.post_excerpt,
    videoId: tutorDetail.data.video[0].source_youtube.split('v=')[1],
    material_includes: tutorDetail.data.course_material_includes[0],
    target_audience: tutorDetail.data.course_target_audience[0],
  });
}