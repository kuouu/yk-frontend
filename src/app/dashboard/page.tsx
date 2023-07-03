'use client'

import { useSession } from "next-auth/react"
import { Loading, Grid } from "@nextui-org/react";
import Sidebar from "./Sidebar";
import EnrollCourses from "./EnrollCourses";

const DashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return (
      <Grid.Container
        alignItems="center"
        justify="center"
        css={{ height: '80vh' }}
      >
        <Loading>Loading</Loading>
      </Grid.Container>
    )
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