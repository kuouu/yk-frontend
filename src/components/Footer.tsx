'use client'

import Image from "next/image"

const Footer = () => {
  const socialIcons = [
    {
      name: "instagram",
      link: "https://www.instagram.com/yourknowledge666",
      src: '/assets/icons/instagram.svg'
    },
    {
      name: "facebook",
      link: "https://www.facebook.com/YourKnowledgelimited",
      src: '/assets/icons/facebook.svg'
    },
    {
      name: "discord",
      link: "https://discord.gg/AekJ25vVjb",
      src: '/assets/icons/discord.svg'
    },
    {
      name: "youtube",
      link: "https://www.youtube.com/@yourknowledge666",
      src: '/assets/icons/youtube.svg'
    }
  ]
  return (
    <footer className="p-4">
      <div className="flex gap-4 justify-center">
        {socialIcons.map((social) => <a key={social.name} href={social.link}>
          <Image src={social.src} alt={social.name + ' icon'} width={36} height={36} />
        </a>)}
      </div>
      <div className="text-center mt-2">
        <p className="text-sm" style={{ color: 'gray!important' }}>
          © 2023 by Your Knowledge
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm" style={{ color: 'gray!important' }}>
          你的知識有限公司
        </p>
        <p className="text-sm" style={{ color: 'gray!important' }}>
          統一編號: 89113689
        </p>
        <p className="text-sm" style={{ color: 'gray!important' }}>
          聯絡email: yourknowledge666@gmail.com
        </p>
      </div>
    </footer>
  )
}

export default Footer