import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  console.log('GET /api/courses')
  const posts = await prisma.wp_posts.findMany({
    where: {
      post_type: 'courses',
      post_status: 'publish',
    },
    select: {
      ID: true,
      post_title: true,
      post_name: true,
      post_date: true,
      author: {
        select: { display_name: true, }
      },
      postmeta: {
        where: {
          OR: [
            { meta_key: '_tutor_course_product_id' },
            { meta_key: '_course_duration' },
            { meta_key: '_thumbnail_id' }
          ]
        },
        select: {
          meta_key: true,
          meta_value: true
        }
      }
    }
  })
  const courses: CourseListType[] = await Promise.all(
    posts.map(async (post) => {
      const postmeta: Record<string, string> = post.postmeta.reduce(
        (acc: Record<string, string>, meta: any) => {
          const metaKey = meta.meta_key.replace(/^_/, '');
          acc[metaKey] = meta.meta_value;
          return acc;
        },
        {}
      );

      const product_meta = await prisma.wp_wc_product_meta_lookup.findFirst({
        where: {
          product_id: Number(postmeta.tutor_course_product_id)
        },
        select: {
          max_price: true,
          min_price: true,
          total_sales: true
        }
      })
      const image = await prisma.wp_posts.findFirst({
        where: {
          ID: Number(postmeta.thumbnail_id),
          post_type: 'attachment',
        },
        select: { guid: true }
      })
      const duration = JSON.parse(
        postmeta.course_duration
          .replace(/a:(\d):|s:(\d):|;i/g, '')
          .replace(/;/g, ',')
          .replace(/,}/g, '}')
      )
      return {
        id: Number(post.ID),
        title: post.post_title,
        slug: post.post_name,
        date: new Date(post.post_date),
        duration: `${duration.hours}h ${duration.minutes}m`,
        author: post.author.display_name,
        price: Number(product_meta?.max_price),
        sale_price: Number(product_meta?.min_price),
        image: image?.guid || '',
        student_count: Number(product_meta?.total_sales),
      }
    }))
  return NextResponse.json(courses)
}
