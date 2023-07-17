import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { unserialize } from "@/utils/wp/unserializeData";
import { formatTime } from "@/utils";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const course = await prisma.wp_posts.findFirst({
    where: { post_name: params.slug },
    select: {
      ID: true,
      post_title: true,
      post_content: true,
      post_excerpt: true,
      postmeta: {
        where: {
          OR: [
            { meta_key: '_video' },
            { meta_key: '_tutor_course_target_audience' },
            { meta_key: '_tutor_course_material_includes' }
          ]
        },
        select: {
          meta_key: true,
          meta_value: true
        }
      }
    }
  });
  const courseMeta = course?.postmeta.reduce((acc, item) => {
    const key = String(item.meta_key).replace('_', '');
    let value = String(item.meta_value);
    if (key === 'video') {
      value = unserialize(value);
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {
    video: { source_youtube: "" },
    tutor_course_material_includes: "",
    tutor_course_target_audience: ""
  });
  const topicPosts = await prisma.wp_posts.findMany({
    where: {
      post_parent: course?.ID,
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
          const duration = formatTime(data.runtime);
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
    videoId: courseMeta?.video.source_youtube.split('v=')[1],
    material_includes: courseMeta?.tutor_course_material_includes,
    target_audience: courseMeta?.tutor_course_target_audience,
    topics: courseTopics
  });
}