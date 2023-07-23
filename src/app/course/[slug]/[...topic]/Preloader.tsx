'use client';

import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hook';
import { setTopic, clearTopic } from '@/store/topicSlice';

type Props = {
  topic: CourseTopicType
}

const Preloader = (props: Props) => {
  const dispatch = useAppDispatch()
  const { topic } = props
  useEffect(() => {
    if (!topic) {
      dispatch(clearTopic())
    } else if (topic) {
      dispatch(setTopic(topic))
    }
  }, [dispatch, topic])
  return null
}

export default Preloader