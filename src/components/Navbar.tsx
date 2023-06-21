'use client'

import { useState, CSSProperties } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { TutorLmsCourse } from "@/types/tutorLmsTypes"

import logo from '../../public/assets/images/logo.png'

type Props = {
  courses: TutorLmsCourse[]
}

const Navbar = (props: Props) => {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [sidemenuOpen, setSidemenuOpen] = useState(false)
  const links = [
    { name: '首頁', link: '/', hide: false },
    { name: '精選課程', link: '/courses', hide: false },
    { name: '講義專區', link: '/handouts', hide: false },
    // { name: '募資專區', link: '/crowdfunding' },
    { name: '購物車', link: '/cart', hide: false },
    { name: '我的帳號', link: '/dashboard', hide: status === 'unauthenticated' },
    { name: '登入', link: '/api/auth/signin', hide: status !== 'unauthenticated' },
    { name: '登出', link: '/api/auth/signout', hide: status === 'unauthenticated' },
  ]
  const toggle = () => setIsOpen(!isOpen)
  return (
    <nav className="py-3 px-8 flex items-center bg-zinc-900 justify-between relative">
      <div className='block lg:hidden cursor-pointer' onClick={() => setSidemenuOpen(!sidemenuOpen)}>
        <Image src={"assets/icons/menu.svg"} alt="menu" width={24} height={24} />
      </div>
      <a href="/" className='w-full flex justify-center lg:w-auto'>
        <Image src={logo} alt="logo" height={45} />
      </a>
      {/* desktop menu */}
      <ul className="hidden lg:flex gap-4 list-none">
        {links.map((link) => {
          if (Array.isArray(link.link))
            return (
              <li className="relative" key={link.name}>
                <a
                  className={`block px-4 py-2 ${isOpen && 'font-bold text-[#29d7ff]'} hover:text-gray-400 hover:cursor-pointer`}
                  onClick={toggle}
                >
                  精選課程
                </a>
                {isOpen && <ul className="absolute grid gap-[1px] left-0 top-full shadow list-none z-10 w-full border-t-2 border-solid border-[#032292]">
                  {link.link.map((cls: TutorLmsCourse) =>
                    <li key={cls.ID} className='w-full flex justify-center'>
                      <a style={subNavStyle} href={'/'} className='text-white hover:text-[#71d0ff]'>
                        {cls.post_title}
                      </a>
                    </li>
                  )}
                </ul>}
              </li>
            )
          return <li key={link.name}>
            {!link.hide && <a className="block px-4 py-2 hover:text-gray-400" href={link.link}>{link.name}</a>}
          </li>
        }
        )}
      </ul>
      {/* side menu */}
      {sidemenuOpen &&
        <ul className="block bg-slate-800 lg:hidden" style={sidemenuStyle}>
          <div className='block lg:hidden px-4 py-2 cursor-pointer' onClick={() => setSidemenuOpen(!sidemenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white">
              <path fill="#fff" d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm1 5a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2H4z" />
            </svg>
          </div>
          {links.map((link) => {
            if (Array.isArray(link.link))
              return (
                <li>
                  <a className={`block px-4 pt-4 pb-2 text-zinc-400 font-bold`}>精選課程</a>
                  <ul className="grid gap-[1px] top-full shadow list-none z-10 w-full">
                    {link.link.map((cls: TutorLmsCourse) =>
                      <li key={cls.ID} className='w-full flex justify-center'>
                        <a href={''} className='text-sm pl-4 py-2 text-white hover:text-[#71d0ff] '>
                          {cls.post_title}
                        </a>
                      </li>
                    )}
                  </ul>
                </li>
              )
            return <li key={link.name}>
              {!link.hide && <a className="block px-4 py-4 hover:text-gray-400" href={link.link}>{link.name}</a>}
            </li>
          }
          )}
        </ul>
      }
    </nav>
  )
}

const subNavStyle: CSSProperties = {
  width: '100%',
  padding: '0.5rem 1rem',
  textAlign: 'center',
  fontWeight: 900,
  backgroundColor: 'rgba(3, 34, 146, 0.35)'
}

const sidemenuStyle: CSSProperties = {
  zIndex: 20,
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  padding: '0 2rem',
  paddingTop: '2rem',
}

export default Navbar