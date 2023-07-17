import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { unserialize } from "@/utils/wp/unserializeData";
import { formatTime } from "@/utils";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const topicId = searchParams.get("id")
  const topicPosts = await prisma.wp_posts.findMany({
    where: {
      ID: Number(topicId),
      post_type: 'topics'
    },
    select: {
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
        orderBy: {
          menu_order: 'asc'
        },
        select: {
          ID: true,
          post_title: true,
          post_content: true,
          post_modified: true,
          postmeta: {
            where: { meta_key: '_video' },
            select: { meta_value: true }
          }
        }
      });

      const courseLessons = await Promise.all(
        lessonPosts.map(async (lesson: any) => {
          const data = unserialize(lesson.postmeta[0].meta_value);
          const duration = formatTime(data.runtime);
          const videoId = data.source_youtube
          return {
            id: Number(lesson.ID),
            title: lesson.post_title,
            content: lesson.post_content,
            modified: lesson.post_modified,
            duration,
            videoId
          };
        })
      );

      return {
        id: topicId,
        title: topic.post_title,
        lessons: courseLessons
      };
    })
  );
  return NextResponse.json(courseTopics);
}