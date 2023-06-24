import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { unserialize } from "@/app/utils";

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
  const topicPosts = await prisma.wp_posts.findMany({
    where: {
      post_parent: id,
      post_type: 'topics'
    },
    select: {
      ID: true,
      post_title: true,
    }
  });
  const courseTopics = await Promise.all(
    topicPosts.map(async (topic: any) => {
      const lessonPosts = await prisma.wp_posts.findMany({
        where: {
          post_parent: topic.ID,
          post_type: 'lesson',
        },
        select: {
          ID: true,
          post_title: true,
          postmeta: {
            where: { meta_key: '_video' },
            select: { meta_value: true }
          }
        }
      });

      const courseLessons = await Promise.all(
        lessonPosts.map(async (post: any) => {
          const data = unserialize(post.postmeta[0].meta_value);
          const hours = data.runtime.hours.padStart(2, '0');
          const minutes = data.runtime.minutes.padStart(2, '0');
          const seconds = data.runtime.seconds.padStart(2, '0');
          const duration = `${hours}:${minutes}:${seconds}`;
          return {
            id: Number(post.ID),
            title: post.post_title,
            duration
          };
        })
      );

      return {
        id: Number(topic.ID),
        title: topic.post_title,
        lessons: courseLessons
      };
    })
  );

  return NextResponse.json({
    id: Number(course?.ID),
    title: course?.post_title,
    content: course?.post_content,
    excerpt: course?.post_excerpt,
    videoId: tutorDetail.data.video[0].source_youtube.split('v=')[1],
    material_includes: tutorDetail.data.course_material_includes[0],
    target_audience: tutorDetail.data.course_target_audience[0],
    topics: courseTopics
  });
}