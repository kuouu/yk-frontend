'use client'

import { Text, Col } from "@nextui-org/react"

type Props = {
  description: string
}

const CourseDescription = ({ description }: Props) => {
  return (
    <Col>
      <Text h3>課程介紹</Text>
      <div dangerouslySetInnerHTML={{
        __html: description.replace(/(&nbsp;)+/g, ' ')
      }} />
    </Col>
  )
}

export default CourseDescription