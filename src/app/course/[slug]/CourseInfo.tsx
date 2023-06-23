'use client'

import { Card, Text, Button } from "@nextui-org/react"

type Props = {
  material_includes: string,
  target_audience: string
}

const CourseInfo = ({ material_includes, target_audience }: Props) => {
  return (
    <Card isHoverable css={{ minWidth: '300px', border: 'none' }}>
      <Card.Header css={{ display: 'flex', justifyContent: 'center' }}>
        <Button>購買課程</Button>
      </Card.Header>
      <div className="my-4"><Card.Divider /></div>
      <Card.Body css={{ paddingTop: 0 }}>
        <Text h4 size='$lg' b className="my-2">
          課程教材:
        </Text>
        <ul>
          {material_includes.split('\r\n').map((e, i, arr) => {
            if (i !== arr.length - 1) {
              return <li key={e}>・{e}</li>
            }
          })}
        </ul>
        {target_audience && <>
          <div className="my-4"><Card.Divider /></div>
          <Text h4 size='$lg' b className="mb-2">
            目標受眾:
          </Text>
          <ul>
            {target_audience.split('\r\n').map(e =>
              <li key={e}><Text>{e}</Text></li>
            )}
          </ul>
        </>}
      </Card.Body>
    </Card>
  )
}

export default CourseInfo