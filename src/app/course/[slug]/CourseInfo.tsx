'use client'

import { Card, Text, Button } from "@nextui-org/react"
import { useAppContext } from "@/appContext"

type Props = {
  courseDetails: any
}

const CourseInfo = ({ courseDetails }: Props) => {
  const courseList = useAppContext()
  const course = courseList.find((course) => course.id === courseDetails.id)
  return (
    <Card
      isHoverable
      css={{ minWidth: '300px', border: 'none', position: 'sticky', top: 10 }}
    >
      <Card.Header css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text h3 size='$2xl' className="my-2">
          {courseDetails.price === 0 ? '免費' : `NT$ ${course?.price}`}
        </Text>
        <Button>購買課程</Button>
      </Card.Header>
      <div className="my-4"><Card.Divider /></div>
      <Card.Body css={{ paddingTop: 0 }}>
        <Text h4 size='$lg' b className="my-2">
          課程教材:
        </Text>
        <ul className="m-0">
          {courseDetails.material_includes.split('\r\n').map((e: string, i: number, arr: any) => {
            if (i !== arr.length - 1) {
              return <li key={e}>・{e}</li>
            }
          })}
        </ul>
        {courseDetails.target_audience && <>
          <div className="my-4"><Card.Divider /></div>
          <Text h4 size='$lg' b className="mb-2">
            目標受眾:
          </Text>
          <ul className="m-0">
            {courseDetails.target_audience.split('\r\n').map((e: string) =>
              <li key={e}><Text>{e}</Text></li>
            )}
          </ul>
        </>}
      </Card.Body>
    </Card>
  )
}

export default CourseInfo