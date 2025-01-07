'use client'

import {
  Link,
  Navbar,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/react"
import Image from "next/image"
import { useSession } from "next-auth/react"

const Nav = () => {
  const { data: _, status } = useSession()
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
  const links = [
    { name: '首頁', link: '/', hide: false },
    { name: '精選課程', link: '/course', hide: false },
    // { name: '講義專區', link: '/handouts', hide: false },
    // { name: '購物車', link: '/cart', hide: false },
    { name: '我的帳號', link: '/dashboard', hide: status === 'unauthenticated' },
    { name: '登入', link: '/api/auth/signin', hide: status !== 'unauthenticated' },
    { name: '登出', link: '/api/auth/signout', hide: status === 'unauthenticated' },
  ]
  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand
          className="cursor-pointer"
          onClick={() => location.href = '/'}
        >
          <Image src='assets/icons/logo.svg' alt="logo" width={48} height={48} />
          <Image src='assets/icons/logo_word.svg' alt="logo" width={108} height={48} />
        </NavbarBrand>
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      {/* desktop menu */}
      <NavbarContent className="hidden sm:flex" justify="end">
        {links.map((link) => !link.hide &&
          <Link
            key={link.name}
            href={link.link}
            color={currentPath === link.link ? 'primary' : 'foreground'}
            isBlock
          >
            {link.name}
          </Link>
        )}
      </NavbarContent>

      {/* mobile menu */}
      <NavbarMenu className="xs:hidden">
        {links.map((link) => !link.hide &&
          <NavbarMenuItem
            key={link.name}
            isActive={currentPath === link.link}
          >
            <Link href={link.link}>{link.name}</Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  )
}

export default Nav