'use client'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  User,
  Link
} from "@heroui/react";
import { useAppSelector } from "@/store/hook";

const Sidebar = () => {
  const user = useAppSelector(state => state.user)

  return (
    <aside>
      <Card>
        <CardHeader>
          <User
            avatarProps={{
              src: user.image || "",
            }}
            name={user.username || ""}
            description={user.email || ""}
          />
        </CardHeader>
        <Divider />
        <CardBody>
          <p>我的課程</p>
        </CardBody>
        <Divider />
        <CardBody>
          <p>個人資料</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            color='danger'
            href="/api/auth/signout"
          >
            登出
          </Link>
        </CardFooter>
      </Card>
    </aside>
  )
}

export default Sidebar
