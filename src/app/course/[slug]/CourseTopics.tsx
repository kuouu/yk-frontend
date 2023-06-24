'use client'

import { Container, Collapse, Table, Text, useSSR } from "@nextui-org/react"

type Props = {
  topics: any[]
}

const CourseTopics = ({ topics }: Props) => {
  const { isBrowser } = useSSR()
  return isBrowser ? (
    <Container css={{ padding: 0 }}>
      <Text h2 size={'$2xl'} css={{ margin: '30px 0 10px 0' }}>課程內容</Text>
      <Collapse.Group>
        {topics && topics.map((topic: any) => (
          <Collapse title={topic.title} key={topic.id}>
            <Table
              aria-label={`lesson-table-${topic.id}`}
              lined
              headerLined
              hoverable
              css={{ padding: 0 }}
            >
              <Table.Header>
                <Table.Column>單元</Table.Column>
                <Table.Column align="end">時長</Table.Column>
              </Table.Header>
              <Table.Body>
                {topic.lessons && topic.lessons.map((lesson: any) => (
                  <Table.Row key={lesson.id}>
                    <Table.Cell>{lesson.title}</Table.Cell>
                    <Table.Cell css={{ textAlign: 'end' }}>{lesson.duration}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Collapse>
        ))}
      </Collapse.Group>
    </Container>
  ) : <></>
}

export default CourseTopics