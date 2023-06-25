'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

type Props = {
  imageSrc: string[]
}

const Jumbotron = (props: Props) => {
  const [imgIdx, setImgIdx] = useState(0)
  const { imageSrc } = props
  const nextImg = () => setImgIdx(imageSrc.length !== 0 ? (imgIdx + 1) % imageSrc.length : 0)
  useEffect(() => {
    const timer = setInterval(nextImg, 5000)
    return () => clearInterval(timer)
  })

  const Circle = () => <div className='w-3 h-3 rounded-full bg-blue-500' />
  const CircleOutline = (props: { idx: number }) => <div
    className='w-3 h-3 rounded-full bg-white border border-blue-500 hover:cursor-pointer'
    onClick={() => setImgIdx(props.idx)}
  />

  return (
    <div className="relative">
      {imageSrc.length !== 0 && <div className='flex gap-2 absolute bottom-8 w-full justify-center z-10'>
        {imageSrc.map((_, idx) =>
          idx === imgIdx
            ? <Circle key={idx + 'circle'} />
            : <CircleOutline key={idx + 'circle-outline'} idx={idx} />
        )}
      </div>}
      <Image
        src={imageSrc.length !== 0 ? imageSrc[imgIdx] : ''}
        alt="jumbotron"
        width={1920}
        height={1080}
        className="lg:h-full w-full opacity-50 object-contain object-center"
      />
    </div>
  )
}

export default Jumbotron