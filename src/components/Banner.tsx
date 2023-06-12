import Image from "next/image"

type Props = {
  title: string
}

const Banner = (props: Props) => {
  const { title } = props
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ position: "relative", width: '100%', height: '200px' }}
    >
      <h2 className="text-4xl z-10 font-bold tracking-wider">
        {title}
      </h2>
      <Image
        src="/assets/images/earth.jpg"
        alt="earth-image"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  )
}

export default Banner