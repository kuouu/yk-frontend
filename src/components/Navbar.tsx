'use client'

import { useState, CSSProperties } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import logo from '../../public/assets/images/logo.png'

const Navbar = () => {
  const { data: session, status } = useSession()
  const [sidemenuOpen, setSidemenuOpen] = useState(false)
  const links = [
    { name: '首頁', link: '/', hide: false },
    { name: '精選課程', link: '/course', hide: false },
    { name: '講義專區', link: '/handouts', hide: false },
    // { name: '募資專區', link: '/crowdfunding' },
    { name: '購物車', link: '/cart', hide: false },
    { name: '我的帳號', link: '/dashboard', hide: status === 'unauthenticated' },
    { name: '登入', link: '/api/auth/signin', hide: status !== 'unauthenticated' },
    { name: '登出', link: '/api/auth/signout', hide: status === 'unauthenticated' },
  ]
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
        {links.map((link) => <li key={link.name}>
          {!link.hide && <a className="block px-4 py-2 hover:text-gray-400" href={link.link}>{link.name}</a>}
        </li>)}
      </ul>
      {/* side menu */}
      {sidemenuOpen &&
        <ul className="block bg-slate-800 lg:hidden" style={sidemenuStyle}>
          <div className='block lg:hidden px-4 py-2 cursor-pointer' onClick={() => setSidemenuOpen(!sidemenuOpen)}>
            <Image src={"assets/icons/menu.svg"} alt="menu" width={24} height={24} />
          </div>
          {links.map((link) => <li key={link.name}>
            {!link.hide && <a className="block px-4 py-4 hover:text-gray-400" href={link.link}>{link.name}</a>}
          </li>)}
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