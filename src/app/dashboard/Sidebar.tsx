'use client'

import { Card, User, Text, Link } from "@nextui-org/react";
import { useAppSelector } from "@/store/hook";

const Sidebar = () => {
  const user = useAppSelector(state => state.user)

  return (
    <aside>
      <Card variant="flat" css={{border: 'none'}}>
        <Card.Header>
          <User
            src={user.image || ""}
            name={user.username || ""}
            description={user.email || ""}
            size="xl"
            zoomed
          />
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Text>我的課程</Text>
        </Card.Body>
        <Card.Divider />
        <Card.Body>
          <Text>個人資料</Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Link
            color={'error'}
            href="/api/auth/signout"
          >
            登出
          </Link>
        </Card.Footer>
      </Card>
    </aside>
  )
}

export default Sidebar
