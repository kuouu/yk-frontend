'use client'

import { useCourseContext } from '../CourseContext';
import { Accordion, AccordionItem, Link } from '@heroui/react';

const LessonNavigator = () => {
  const course = useCourseContext()
  return (
    <Accordion variant="shadow">
      {course.topics && course.topics.map((topic: CourseTopicType) => (
        <AccordionItem key={topic.id} title={topic.title}>
          {topic.lessons && topic.lessons.map((lesson: CourseLessonType) => (
            <Link
              key={lesson.id}
              color='primary'
              className='my-2'
              href={`/course/${course.slug}/${topic.id}/${lesson.id}`}
            >
              {lesson.title}
            </Link>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default LessonNavigator