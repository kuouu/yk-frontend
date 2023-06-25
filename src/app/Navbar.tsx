'use client'

import { Link, Navbar } from "@nextui-org/react"
import Image from "next/image"
import { useSession } from "next-auth/react"

const Nav = () => {
  const { data: session, status } = useSession()
  const currentPath = window.location.pathname
  const links = [
    { name: '首頁', link: '/', hide: false },
    { name: '精選課程', link: '/course', hide: false },
    { name: '講義專區', link: '/handouts', hide: false },
    { name: '購物車', link: '/cart', hide: false },
    { name: '我的帳號', link: '/dashboard', hide: status === 'unauthenticated' },
    { name: '登入', link: '/api/auth/signin', hide: status !== 'unauthenticated' },
    { name: '登出', link: '/api/auth/signout', hide: status === 'unauthenticated' },
  ]
  return (
    <Navbar>
      <Navbar.Toggle showIn={'xs'} />
      <Navbar.Brand
        css={{ cursor: 'pointer' }}
        onClick={() => location.href = '/'}
      >
        <Image src={"assets/icons/logo.svg"} alt="logo" width={48} height={48} />
        <Image src={"assets/icons/logo_word.svg"} alt="logo" width={108} height={48} />
      </Navbar.Brand>
      {/* desktop menu */}
      <Navbar.Content hideIn={'xs'}>
        {links.map((link) => !link.hide &&
          <Navbar.Link
            key={link.name}
            href={link.link}
            isActive={currentPath === link.link}
          >
            {link.name}
          </Navbar.Link>
        )}
      </Navbar.Content>

      {/* mobile menu */}
      <Navbar.Collapse showIn={'xs'}>
        {links.map((link) => !link.hide &&
          <Navbar.CollapseItem
            key={link.name}
            isActive={currentPath === link.link}
          >
            <Link color='inherit' href={link.link}>{link.name}</Link>
          </Navbar.CollapseItem>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Nav