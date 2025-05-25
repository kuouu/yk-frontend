'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button
} from "@heroui/react"
import { useCourseContext } from "./CourseContext"

const CourseInfo = () => {
  const course = useCourseContext()
  return (
    <Card
      style={{
        minWidth: '300px',
        border: 'none',
        position: 'sticky',
        top: 10
      }}
    >
      <CardHeader style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p className="my-2 text-4xl mb-4">
          {course.price === 0 ? '免費' : `NT$ ${course?.price}`}
        </p>
        <Button>購買課程</Button>
      </CardHeader>
      <div className="my-4"><Divider /></div>
      <CardBody style={{ paddingTop: 0 }}>
        <p className="my-2 text-lg font-bold">
          課程教材:
        </p>
        <ul className="m-0">
          {course.material_includes.split('\r\n').map((e: string, i: number, arr: any) => {
            if (i !== arr.length - 1) {
              return <li key={e}>・{e}</li>
            }
          })}
        </ul>
        {course.target_audience && <>
          <div className="my-4"><Divider /></div>
          <p className="mb-2 text-lg font-bold">
            目標受眾:
          </p>
          <ul className="m-0">
            {course.target_audience.split('\r\n').map((e: string) =>
              <li key={e}><p>{e}</p></li>
            )}
          </ul>
        </>}
      </CardBody>
    </Card>
  )
}

export default CourseInfo