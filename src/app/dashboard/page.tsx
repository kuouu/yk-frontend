'use client'

import { Grid } from "@heroui/react";
import Sidebar from "./Sidebar";
import EnrollCourses from "./EnrollCourses";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/store/hook";
import { selectIsLogin } from "@/store/userSlice";

const DashboardPage = () => {
  const isLogin = useAppSelector(selectIsLogin);

  if (!isLogin) {
    redirect('/')
  }

  return (
    <Grid.Container
      gap={2}
      justify="center"
      css={{padding: '2rem 4rem'}}
    >
      <Grid xs={4} justify="flex-end">
        <Sidebar />
      </Grid>
      <Grid xs={8}>
        <EnrollCourses />
      </Grid>
    </Grid.Container>
  )
}

export default DashboardPage