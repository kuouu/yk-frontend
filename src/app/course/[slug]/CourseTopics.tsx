'use client'

import { 
  Accordion, 
  AccordionItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react"
import { useCourseContext } from "./CourseContext"

const CourseTopics = () => {
  const { topics } = useCourseContext()
  return (
    <div className="p-0">
      <h3>課程內容</h3>
      <Accordion>
        {topics && topics.map((topic: any) => (
          <AccordionItem title={topic.title} key={topic.id}>
            <Table
              aria-label={`lesson-table-${topic.id}`}
              style={{ padding: 0 }}
            >
              <TableHeader>
                <TableColumn>單元</TableColumn>
                <TableColumn align="end">時長</TableColumn>
              </TableHeader>
              <TableBody>
                {topic.lessons && topic.lessons.map((lesson: any) => (
                  <TableRow key={lesson.id}>
                    <TableCell>{lesson.title}</TableCell>
                    <TableCell style={{ textAlign: 'end' }}>{lesson.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default CourseTopics