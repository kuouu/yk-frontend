'use client'

import { useCourseContext } from '../CourseContext';
import { Collapse, Container, Link } from '@heroui/react';

const LessonNavigator = () => {
  const course = useCourseContext()
  return (
    <Container>
      <Collapse.Group shadow>
        {course.topics && course.topics.map((topic: CourseTopicType) => (
          <Collapse key={topic.id} title={topic.title}>
            {topic.lessons && topic.lessons.map((lesson: CourseLessonType) => (
              <Link
                key={lesson.id}
                color='text'
                block
                css={{ margin: '3px 0' }}
                href={`/course/${course.slug}/${topic.id}/${lesson.id}`}
              >
                {lesson.title}
              </Link>
            ))}
          </Collapse>
        ))}
      </Collapse.Group>
    </Container>
  )
}

export default LessonNavigator