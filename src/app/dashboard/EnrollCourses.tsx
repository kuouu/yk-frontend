'use client'

import { useState, useEffect } from 'react'
import { Col, Divider, Row, Text } from "@nextui-org/react"
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
      <Divider />
      <Row>
        {courses
          .filter((course: CourseListType) => {
            const isEnrolled = enrolledId.find((enrolledCourse: any) =>
              enrolledCourse.id === course.id
            )
            return isEnrolled
          })
          .map((course: CourseListType) => {
            return (
              <Col key={course.id}>
                <Text h4>{course.title}</Text>
              </Col>
            )
          })}
      </Row>
    </Col>
  )
}

export default EnrollCourses