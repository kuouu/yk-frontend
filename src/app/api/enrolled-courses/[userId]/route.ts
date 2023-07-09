import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

import { unserialize } from "@/utils/wp/unserializeData";
import { formatTime } from '@/utils'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const courseIDs = await prisma.wp_posts.findMany({
    where: {
      post_type: 'tutor_enrolled',
      post_status: 'completed',
      post_author: Number(params.userId)
    },
    select: {
      post_parent: true,
    }
  })
  return NextResponse.json(courseIDs.map((course: any) => {
    return { id: Number(course.post_parent) }
  }))
}
