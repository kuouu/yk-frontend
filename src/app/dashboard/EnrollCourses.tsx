'use client'

import { useState, useEffect } from 'react'
import { Col, Divider, Row, Text, Image } from "@nextui-org/react"
import { useSession } from 'next-auth/react';
import { customFetch } from "@/utils/customFetch"
import { useAppContext } from "@/appContext";


const getEnrolledList = async (userId: string | undefined) => {
  if (!userId) return []
  const url = `/api/enrolled-courses/${userId}`;
  const res = await customFetch(url);
  return res;
};

const EnrollCourses = () => {
  const [enrolledId, setEnrolledId] = useState<string[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const courses = useAppContext();
  useEffect(() => {
    const getEnrolled = async () => {
      const enrolledList = await getEnrolledList(userId);
      setEnrolledId(enrolledList);
    }
    getEnrolled();
  }, [userId])
  return (
    <Col>
      <Text h3>我的課程</Text>
      <Divider css={{ margin: '10px 0' }} />
      <Row
        gap={2}
        css={{
          margin: '0',
          paddingTop: '10px',
          overflowX: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {courses
          .filter((course: CourseListType) => {
            const isEnrolled = enrolledId.find((enrolledCourse: any) =>
              enrolledCourse.id === course.id
            )
            return isEnrolled
          })
          .map((course: CourseListType) => {
            return (
              <Col
                key={course.id}
                css={{ width: 'max-content', cursor: 'pointer' }}
                onClick={() => location.href = `/course/${course.slug}`}
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  width={300}
                  height={200}
                />
                <Col css={{ marginTop: '10px', padding: 0 }}>
                  <Text size='$lg' css={{margin: 0}}>{course.title}</Text>
                  <p className='text-gray-500'>by {course.author}</p>
                </Col>
              </Col>
            )
          })}
      </Row>
    </Col>
  )
}

export default EnrollCourses