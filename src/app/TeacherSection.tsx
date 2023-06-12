import Image from 'next/image'

type Props = {
  name: string
  description: string
  imgSrc: string
}

const TeacherProfile = (props: Props) => {
  const { name, description, imgSrc } = props
  return (
    <div className="w-64 flex flex-col items-center justify-center">
      <Image
        src={imgSrc}
        width={128}
        height={128}
        alt={'image' + name}
        className="w-32 h-32 object-cover rounded-full shadow"
      />
      <div className="mt-4 p-4">
        <h3 className="text-xl font-bold text-zinc-50">{name}</h3>
        <p className="text-sm text-zinc-100">{description}</p>
      </div>
    </div>
  )
}

const TeacherSection = () => {
  const teachers = [
    {
      name: "土木幸福教練",
      description: "86年土木技師高考，首試即上榜",
      imgSrc: 'https://yourknowledge.online/wp-content/uploads/2023/01/cehappiness-scaled.jpg',
    }
  ]
  return (
    <section className='p-10'>
    <h2 className='text-3xl font-bold mb-8 pl-4 border-l-4 border-sky-400'>專業師資</h2>
      <div className="flex gap-8 justify-around">
        {teachers.map((teacher) =>
          <TeacherProfile key={'teacher-' + teacher.name} {...teacher} />
        )}
      </div>
    </section>
  )
}

export default TeacherSection