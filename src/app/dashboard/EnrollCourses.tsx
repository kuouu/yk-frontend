'use client'

import { Col, Divider, Text } from "@nextui-org/react"

type Props = {}

const EnrollCourses = (props: Props) => {
  return (
    <Col>
      <Text h3>我的課程</Text>
      <Divider />
      {/* get enrolled courses */}
    </Col>
  )
}

export default EnrollCourses