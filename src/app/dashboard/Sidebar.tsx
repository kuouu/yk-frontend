'use client'

import { Card, User, Text, Link } from "@nextui-org/react";
import { useSession } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <aside>
      <Card variant="flat" css={{border: 'none'}}>
        <Card.Header>
          <User
            src={user?.image || ""}
            name={user?.name || ""}
            description={user?.email || ""}
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
